// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schemas
import Comment from './comment.schema';
import User from 'src/user/user.schema';

// dto
import {
  CommentDto,
  CreateCommentDto,
  DetailedCommentsDto,
  GetAllCommentsResponseDto,
  GetAllQueryCommentsDto,
  PatchCommentResponseDto,
  PatchCommentDto,
} from './dto';
import Reaction from 'src/reaction/reaction.schema';
import { IComment } from './comment.types';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentModel: typeof Comment) {}

  async create({
    userId,
    createCommentDto,
  }: {
    userId: string;
    createCommentDto: CreateCommentDto;
  }): Promise<CommentDto> {
    const comment = {
      ...createCommentDto,
      authorId: userId,
    };
    const createdComment = await this.commentModel.create(comment);
    return createdComment;
  }

  async patch({
    userId,
    commentId,
    updateCommentDto,
  }: {
    userId: string;
    commentId: string;
    updateCommentDto: PatchCommentDto;
  }): Promise<PatchCommentResponseDto> {
    const comment = await this.commentModel.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const reactionAuthor = await this.commentModel.findOne({
      where: { id: commentId, authorId: userId },
    });

    if (!reactionAuthor) {
      throw new NotFoundException(`You are not author of this comment`);
    }

    comment.set(updateCommentDto);

    const updatedArticle = await comment.save();

    return updatedArticle;
  }

  async delete({ userId, commentId }: { userId: string; commentId: string }) {
    const article = await this.commentModel.findOne({
      where: { id: commentId },
    });

    if (!article) {
      throw new NotFoundException('Comment not found');
    }

    const articleAuthor = await this.commentModel.findOne({
      where: { id: commentId, authorId: userId },
    });

    if (!articleAuthor) {
      throw new NotFoundException('You are not author of this comment');
    }

    const deletedComment = await this.commentModel.destroy({
      where: {
        id: commentId,
      },
    });
    if (deletedComment === 0) {
      throw new BadRequestException(
        'Something went wrong while deleting the comment',
      );
    }
  }

  async findAll({
    query,
  }: {
    query: GetAllQueryCommentsDto;
  }): Promise<GetAllCommentsResponseDto> {
    const comments = await this.commentModel.findAndCountAll({
      where: query.toWhereCondition?.(),
      ...query.toPaginationOptions?.(),
      include: [
        { model: User, as: 'author' },
        { model: Reaction, as: 'reactions' },
      ],
    });

    return {
      comments: comments.rows as unknown as DetailedCommentsDto[],
      count: comments.count,
    };
  }

  async findOne(whereCondition: Partial<IComment>): Promise<Comment | null> {
    return this.commentModel.findOne({
      where: whereCondition,
    });
  }
}
