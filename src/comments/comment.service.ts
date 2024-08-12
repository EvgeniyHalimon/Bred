// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schema
import { Comment } from './schema/comment.schema';

// dto
import { CreateCommentDto } from './dto/create-comments.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentModel: typeof Comment) {}

  async create({
    userId,
    createReactionDto,
  }: {
    userId: string;
    createReactionDto: CreateCommentDto;
  }): Promise<Comment> {
    try {
      const comment = {
        ...createReactionDto,
        authorId: userId,
      };
      const createdComment = await this.commentModel.create(comment);
      return createdComment;
    } catch (err) {
      console.log(
        '🚀 ~ file: comment.service.ts:32 ~ CommentsService ~ create ~ err:',
        err,
      );
      throw err;
    }
  }

  async update({
    userId,
    commentId,
    updateCommentDto,
  }: {
    userId: string;
    commentId: string;
    updateCommentDto: any;
  }) {
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

  async deleteById({
    userId,
    commentId,
  }: {
    userId: string;
    commentId: string;
  }) {
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

    const deletedArticle = await this.commentModel.destroy({
      where: {
        id: commentId,
      },
    });
    if (deletedArticle === 0) {
      throw new BadRequestException(
        'Something went wrong while deleting the article',
      );
    }
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.findAll();
  }
}
