// nest
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// controller
import { CommentController } from './comment.controller';

// service
import { CommentsService } from './comment.service';

// comment
import Comment from './comment.schema';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
