// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// service
import { CommentsService } from 'src/comments/comment.service';
import { ArticlesService } from 'src/articles/article.service';

// schemas
import Reaction from './reaction.schema';
import User from 'src/users/user.schema';

//dto's
import {
  CreateReactionDto,
  GetAllReactionsDto,
  GetAllReactionsOptions,
  GetAllReactionsPresenter,
  GetByIdReactionPresenter,
  PatchReactionDto,
  PatchReactionPresenter,
  PostReactionPresenter,
} from './dto';

// types
import { IReactions } from './reaction.types';

// constants
import { ReactionTypeEnum, SourceTypeEnum } from './reaction.constants';
// constants
import { vocabulary } from 'src/shared';

const {
  reactions: {
    REACTION_NOT_FOUND,
    NOT_AUTHOR_OF_REACTION,
    WRONG_REACTION_TYPE_FOR_COMMENT,
    WRONG_REACTION_TYPE_FOR_ARTICLE,
    ALREADY_REACTED_TO_ARTICLE,
    ALREADY_REACTED_TO_COMMENT,
    COMMENT_OR_ARTICLE_ID_REQUIRED,
  },
} = vocabulary;

@Injectable()
export class ReactionsService {
  constructor(
    @InjectModel(Reaction) readonly reactionModel: typeof Reaction,
    readonly commentService: CommentsService,
    readonly articleService: ArticlesService,
  ) {}

  async create({
    userId,
    createReactionDto,
  }: {
    userId: string;
    createReactionDto: CreateReactionDto;
  }): Promise<PostReactionPresenter> {
    const { sourceType, articleId, commentId, reactionType } =
      createReactionDto;

    await this.checks({
      commentId,
      articleId,
      userId,
      sourceType,
      reactionType,
    });

    const reaction = await this.reactionModel.create({
      userId,
      ...createReactionDto,
    });

    if (!reaction) {
      throw new BadRequestException(
        `Something went wrong while making ${sourceType}`,
      );
    }

    return reaction;
  }

  async delete({
    userId,
    reactionId,
  }: {
    userId: string;
    reactionId: string;
  }): Promise<void> {
    const reaction = await this.findOne({ id: reactionId });

    if (!reaction) {
      throw new NotFoundException(REACTION_NOT_FOUND);
    }

    const reactionAuthor = await this.findOne({ userId });

    if (!reactionAuthor) {
      throw new NotFoundException(NOT_AUTHOR_OF_REACTION);
    }

    await this.reactionModel.destroy({
      where: {
        id: reactionId,
      },
    });
  }

  async patch({
    userId,
    reactionId,
    updateReactionDto,
  }: {
    userId: string;
    reactionId: string;
    updateReactionDto: PatchReactionDto;
  }): Promise<PatchReactionPresenter> {
    const reaction = (await this.findOne({ id: reactionId })) as Reaction;

    const reactionAuthor = await this.findOne({ userId });

    if (!reactionAuthor) {
      throw new NotFoundException(NOT_AUTHOR_OF_REACTION);
    }

    reaction.set(updateReactionDto);

    const updatedArticle = await reaction.save();

    return updatedArticle;
  }

  async getById({
    reactionId,
  }: {
    reactionId: string;
  }): Promise<GetByIdReactionPresenter> {
    const article = await this.reactionModel.findOne({
      where: { id: reactionId },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    if (!article) {
      throw new NotFoundException(REACTION_NOT_FOUND);
    }

    return article;
  }

  async findAll(query: GetAllReactionsDto): Promise<GetAllReactionsPresenter> {
    const dto = new GetAllReactionsOptions(query);
    const reactions = await this.reactionModel.findAndCountAll({
      where: dto.toWhereCondition(),
      ...dto.toPaginationOptions(),
      include: [{ model: User, as: 'user' }],
      distinct: true,
    });
    return new GetAllReactionsPresenter(reactions.rows, reactions.count);
  }

  async findOne(whereCondition: Partial<IReactions>): Promise<Reaction | null> {
    return this.reactionModel.findOne({ where: whereCondition });
  }

  async checks({
    commentId,
    articleId,
    userId,
    sourceType,
    reactionType,
  }: {
    commentId: string;
    articleId: string;
    userId: string;
    sourceType: SourceTypeEnum;
    reactionType: ReactionTypeEnum;
  }): Promise<void> {
    if (!commentId && !articleId) {
      throw new BadRequestException(COMMENT_OR_ARTICLE_ID_REQUIRED);
    }

    this.validateReactionType(commentId, articleId, sourceType, reactionType);

    if (sourceType === SourceTypeEnum.ARTICLE) {
      await this.validateArticleReaction(articleId, userId);
    } else {
      await this.validateCommentReaction(commentId, userId);
    }
  }

  private validateReactionType(
    commentId: string,
    articleId: string,
    sourceType: SourceTypeEnum,
    reactionType: ReactionTypeEnum,
  ): void {
    if (commentId && this.getCommentCondition({ sourceType, reactionType })) {
      throw new BadRequestException(WRONG_REACTION_TYPE_FOR_COMMENT);
    }

    if (articleId && this.getArticleCondition({ sourceType, reactionType })) {
      throw new BadRequestException(WRONG_REACTION_TYPE_FOR_ARTICLE);
    }
  }

  private async validateArticleReaction(
    articleId: string,
    userId: string,
  ): Promise<void> {
    await this.articleService.findOne({ id: articleId });

    const reaction = await this.findOne({
      userId,
      articleId,
    });
    if (reaction) {
      throw new BadRequestException(ALREADY_REACTED_TO_ARTICLE);
    }
  }

  private async validateCommentReaction(
    commentId: string,
    userId: string,
  ): Promise<void> {
    await this.commentService.findOne({ id: commentId });

    const reaction = await this.findOne({
      userId,
      commentId,
    });
    if (reaction) {
      throw new BadRequestException(ALREADY_REACTED_TO_COMMENT);
    }
  }

  private getArticleCondition({
    sourceType,
    reactionType,
  }: {
    sourceType: SourceTypeEnum;
    reactionType: ReactionTypeEnum;
  }): boolean {
    return (
      SourceTypeEnum.COMMENT === sourceType ||
      reactionType === ReactionTypeEnum.LIKE ||
      reactionType === ReactionTypeEnum.DISLIKE
    );
  }

  private getCommentCondition({
    sourceType,
    reactionType,
  }: {
    sourceType: SourceTypeEnum;
    reactionType: ReactionTypeEnum;
  }): boolean {
    return (
      SourceTypeEnum.ARTICLE === sourceType ||
      reactionType === ReactionTypeEnum.UPVOTE ||
      reactionType === ReactionTypeEnum.DOWNVOTE
    );
  }
}
