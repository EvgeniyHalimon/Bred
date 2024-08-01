import { Module } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { Comment } from './schema/comment.schema';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  providers: [CommentsService],
})
export class CommentsModule {}
