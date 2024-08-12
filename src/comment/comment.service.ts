// nest
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schema
import Comment from './comment.schema';

// library
import { Sequelize } from 'sequelize-typescript';

// dto
import { CreateCommentDto } from './dto/create-comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentModel: typeof Comment,
    private sequelize: Sequelize,
  ) {}

  async create(createUserDto: CreateCommentDto): Promise<Comment> {
    try {
      const result = await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };

        const comment = {
          text: createUserDto.text,
          authorId: createUserDto.authorId,
        };
        const createdComment = await this.commentModel.create(
          comment,
          transactionHost,
        );
        return createdComment;
      });

      return result;
    } catch (err) {
      console.log(
        '🚀 ~ file: comment.service.ts:32 ~ CommentsService ~ create ~ err:',
        err,
      );
      throw err;
    }
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.findAll();
  }
}
