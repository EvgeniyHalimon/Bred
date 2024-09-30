// nest
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schemas
import Comment from './comment.schema';
import User from 'src/users/user.schema';

// dto
import {
  CommentPresenter,
  CreateCommentDto,
  GetAllQueryCommentsDto,
  PatchCommentPresenter,
  PatchCommentDto,
  GetAllCommentsPresenter,
} from './dto';
import Reaction from 'src/reactions/reaction.schema';
import { IComment } from './comment.types';
import { vocabulary } from 'src/shared';

const {
  comments: { COMMENT_NOT_FOUND, NOT_AUTHOR_OF_COMMENT },
} = vocabulary;

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentModel: typeof Comment) {}

  async create({
    userId,
    createCommentDto,
  }: {
    userId: string;
    createCommentDto: CreateCommentDto;
  }): Promise<CommentPresenter> {
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
  }): Promise<PatchCommentPresenter> {
    const comment = (await this.commentModel.findOne({
      where: { id: commentId },
    })) as Comment;

    const reactionAuthor = await this.commentModel.findOne({
      where: { id: commentId, authorId: userId },
    });

    if (!reactionAuthor) {
      throw new NotFoundException(NOT_AUTHOR_OF_COMMENT);
    }

    comment.set(updateCommentDto);

    const updatedArticle = await comment.save();

    return updatedArticle;
  }

  async delete({ userId, commentId }: { userId: string; commentId: string }) {
    await this.commentModel.findOne({
      where: { id: commentId },
    });

    const articleAuthor = await this.commentModel.findOne({
      where: { id: commentId, authorId: userId },
    });

    if (!articleAuthor) {
      throw new NotFoundException(NOT_AUTHOR_OF_COMMENT);
    }

    await this.commentModel.destroy({
      where: {
        id: commentId,
      },
    });
  }

  async findOne(whereCondition: Partial<IComment>): Promise<CommentPresenter> {
    const comment = await this.commentModel.findOne({
      where: whereCondition,
    });

    if (!comment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }

    return comment;
  }

  async findAll(
    query: GetAllQueryCommentsDto,
  ): Promise<GetAllCommentsPresenter> {
    const comments = await this.commentModel.findAndCountAll({
      where: query.toWhereCondition?.(),
      ...query.toPaginationOptions?.(),
      include: [
        { model: User, as: 'author' },
        { model: Reaction, as: 'reactions' },
      ],
      distinct: true,
    });

    return new GetAllCommentsPresenter(comments.rows, comments.count);
  }
}
