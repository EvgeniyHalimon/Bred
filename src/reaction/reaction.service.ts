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
import { CreateReactionDto, GetAllQueryReactionsDto } from './dto';

// types
import { IReactions } from './reaction.types';

// constants
import { SourceTypeEnum } from './reaction.constants';

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
      const { sourceType, articleId, commentId } = createReactionDto;

      if (sourceType === SourceTypeEnum.ARTICLE) {
        const article = await this.articleService.findOne({ articleId });
        if (!article) {
          throw new NotFoundException('Article not found');
        }
      } else {
        const comment = await this.commentService.findOne({ commentId });
        if (!comment) {
          throw new NotFoundException('Comment not found');
        }
      }

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
    }
  }

  async delete({ userId, reactionId }: { userId: string; reactionId: string }) {
    try {
      const reaction = await this.reactionModel.findOne({
        where: { id: reactionId },
      });

      if (!reaction) {
        throw new NotFoundException('Reaction not found');
      }

      const reactionAuthor = await this.reactionModel.findOne({
        where: { userId },
      });

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
    updateReactionDto: any;
  }) {
    const reaction = await this.reactionModel.findOne({
      where: { id: reactionId },
    });

    if (!reaction) {
      throw new NotFoundException('Reaction not found');
    }

    const reactionAuthor = await this.reactionModel.findOne({
      where: { userId },
    });

    if (!reactionAuthor) {
      throw new NotFoundException(`You are not author of this reaction`);
    }

    reaction.set(updateReactionDto);

    const updatedArticle = await reaction.save();

    return updatedArticle;
  }

  async getById({ reactionId }: { reactionId: string }) {
    console.log(
      '🚀 ~ file: reaction.service.ts:149 ~ ReactionsService ~ getById ~ reactionId:',
      reactionId,
    );
    try {
      const article = await this.reactionModel.findOne({
        where: { id: reactionId },
        include: [
          {
            model: User,
            as: 'author',
            attributes: { exclude: ['password'] },
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
}
