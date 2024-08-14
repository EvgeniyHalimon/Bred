// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// service
import { CommentsService } from 'src/comment/comment.service';
import { ArticlesService } from 'src/article/article.service';

// schemas
import Reaction from './reaction.schema';
import User from 'src/user/user.schema';

//dto's
import {
  CreateReactionDto,
  GetAllQueryReactionsDto,
  UpdateReactionDto,
} from './dto';

// types
import { IReactions } from './reaction.types';

// constants
import { ReactionTypeEnum, SourceTypeEnum } from './reaction.constants';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectModel(Reaction) private reactionModel: typeof Reaction,
    private commentService: CommentsService,
    private articleService: ArticlesService,
  ) {}

  async create({
    userId,
    createReactionDto,
  }: {
    userId: string;
    createReactionDto: CreateReactionDto;
  }): Promise<IReactions | undefined> {
    try {
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
    } catch (error) {
      console.log(
        '🚀 ~ file: reactions.service.ts:46 ~ ReactionsService ~ error:',
        error,
      );
      throw error;
    }
  }

  async delete({ userId, reactionId }: { userId: string; reactionId: string }) {
    try {
      const reaction = await this.findOne({
        whereCondition: { id: reactionId },
      });

      if (!reaction) {
        throw new NotFoundException('Reaction not found');
      }

      const reactionAuthor = await this.findOne({ whereCondition: { userId } });

      if (!reactionAuthor) {
        throw new NotFoundException(
          `You are not author of this ${reaction.reactionType}`,
        );
      }

      const deletedReaction = await this.reactionModel.destroy({
        where: {
          id: reactionId,
        },
      });
      if (!deletedReaction) {
        throw new BadRequestException(
          `Something went wrong while deleting the ${reaction.reactionType}`,
        );
      }
      return deletedReaction;
    } catch (error) {
      console.log(
        '🚀 ~ file: reactions.service.ts:85 ~ ReactionsService ~ delete ~ error:',
        error,
      );
      throw error;
    }
  }

  async update({
    userId,
    reactionId,
    updateReactionDto,
  }: {
    userId: string;
    reactionId: string;
    updateReactionDto: UpdateReactionDto;
  }) {
    const reaction = await this.findOne({
      whereCondition: { id: reactionId },
    });

    if (!reaction) {
      throw new NotFoundException('Reaction not found');
    }

    const reactionAuthor = await this.findOne({ whereCondition: { userId } });

    if (!reactionAuthor) {
      throw new NotFoundException(`You are not author of this reaction`);
    }

    reaction.set(updateReactionDto);

    const updatedArticle = await reaction.save();

    return updatedArticle;
  }

  async getById({ reactionId }: { reactionId: string }) {
    try {
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
        throw new NotFoundException('Reaction not found');
      }

      return article;
    } catch (error) {
      console.log(
        '🚀 ~ file: reactions.service.ts:131 ~ ReactionsService ~ get ~ error:',
        error,
      );
      throw error;
    }
  }

  async findAll({ query }: { query: GetAllQueryReactionsDto }) {
    const reactions = await this.reactionModel.findAndCountAll({
      where: query.toWhereCondition(),
      ...query.toPaginationOptions(),
      include: [{ model: User, as: 'user' }],
    });
    return reactions;
  }

  async findOne({ whereCondition }: { whereCondition: Partial<IReactions> }) {
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
  }) {
    if (!commentId && !articleId) {
      throw new BadRequestException(
        'Either commentId or articleId must be provided.',
      );
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
  ) {
    if (commentId && this.getCommentCondition({ sourceType, reactionType })) {
      throw new BadRequestException('Wrong reaction types for comment.');
    }

    if (articleId && this.getArticleCondition({ sourceType, reactionType })) {
      throw new BadRequestException('Wrong reaction types for article.');
    }
  }

  private async validateArticleReaction(articleId: string, userId: string) {
    const article = await this.articleService.findOne({ articleId });
    if (!article) {
      throw new NotFoundException('Article not found.');
    }

    const reaction = await this.findOne({
      whereCondition: { userId, articleId },
    });
    if (reaction) {
      throw new BadRequestException(
        'You have already reacted to this article.',
      );
    }
  }

  private async validateCommentReaction(commentId: string, userId: string) {
    const comment = await this.commentService.findOne({ commentId });
    if (!comment) {
      throw new NotFoundException('Comment not found.');
    }

    const reaction = await this.findOne({
      whereCondition: { userId, commentId },
    });
    if (reaction) {
      throw new BadRequestException(
        'You have already reacted to this comment.',
      );
    }
  }

  private getArticleCondition({
    sourceType,
    reactionType,
  }: {
    sourceType: SourceTypeEnum;
    reactionType: ReactionTypeEnum;
  }) {
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
  }) {
    return (
      SourceTypeEnum.ARTICLE === sourceType ||
      reactionType === ReactionTypeEnum.UPVOTE ||
      reactionType === ReactionTypeEnum.DOWNVOTE
    );
  }
}
