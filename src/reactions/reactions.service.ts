// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schema
import { Reaction } from './schema/reaction.schema';

//dto's
import { CreateReactionDto } from './dto';

// types
import { IReactions } from './interfaces/reaction.interfaces';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class ReactionsService {
  constructor(@InjectModel(Reaction) private reactionModel: typeof Reaction) {}

  async create({
    userId,
    createReactionDto,
  }: {
    userId: string;
    createReactionDto: CreateReactionDto;
  }): Promise<IReactions | undefined> {
    try {
      const source = createReactionDto.sourceType;

      const reaction = await this.reactionModel.create({
        userId,
        ...createReactionDto,
      });

      if (!reaction) {
        throw new BadRequestException(
          `Something went wrong while making ${source}`,
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

  async findAll({ queries }: { queries: any }) {
    const whereCondition = queries.title ? { title: queries.title } : {};
    const result = await this.reactionModel.findAndCountAll({
      where: whereCondition,
      limit: queries.limit,
      offset: queries.offset,
      order: [[queries.orderBy, queries.order]],
      include: [
        { model: User, as: 'author', attributes: { exclude: ['password'] } },
      ],
    });
    return result;
  }
}
