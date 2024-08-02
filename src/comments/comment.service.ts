import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateCommentDto } from './dto/create-comments.dto';
import { Comment } from './schema/comment.schema';

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
      console.log('🚀 ~ UsersService ~ create ~ err:', err);
      throw err;
    }
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.findAll();
  }
}
