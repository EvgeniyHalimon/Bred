// nest
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schema
import { Comment } from './schema/comment.schema';

// dto
import { CreateCommentDto } from './dto/create-comments.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentModel: typeof Comment) {}

  async create(createUserDto: CreateCommentDto): Promise<Comment> {
    try {
      const comment = {
        text: createUserDto.text,
        authorId: createUserDto.authorId,
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

  async findAll(): Promise<Comment[]> {
    return this.commentModel.findAll();
  }
}
