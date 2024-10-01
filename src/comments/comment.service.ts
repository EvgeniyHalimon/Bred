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
  GetAllCommentsDto,
  PatchCommentPresenter,
  PatchCommentDto,
  GetAllCommentsPresenter,
  GetAllCommentsOptions,
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
  }): Promise<PatchCommentPresenter | void> {
    const comment = await this.findOne({
      id: commentId,
    });

    const commentAuthor = await this.findOne({
      id: commentId,
      authorId: userId,
    });

    if (!commentAuthor) {
      throw new NotFoundException(NOT_AUTHOR_OF_COMMENT);
    }

    if (comment) {
      comment.set(updateCommentDto);

      const updatedArticle = await comment.save();

      return updatedArticle;
    }
  }

  async delete({ userId, commentId }: { userId: string; commentId: string }) {
    await this.findOne({ id: commentId });

    const articleAuthor = await this.findOne({
      id: commentId,
      authorId: userId,
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

  async findOne(whereCondition: Partial<IComment>): Promise<Comment> {
    const comment = await this.commentModel.findOne({
      where: whereCondition,
    });

    if (!comment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }

    return comment;
  }

  async findAll(query: GetAllCommentsDto): Promise<GetAllCommentsPresenter> {
    const dto = new GetAllCommentsOptions(query);
    const comments = await this.commentModel.findAndCountAll({
      where: dto.toWhereCondition(),
      ...dto.toPaginationOptions(),
      include: [
        { model: User, as: 'author' },
        { model: Reaction, as: 'reactions' },
      ],
      distinct: true,
    });

    return new GetAllCommentsPresenter(comments.rows, comments.count);
  }
}
