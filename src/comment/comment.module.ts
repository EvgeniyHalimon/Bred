// nest
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// service
import { CommentsService } from './comment.service';

// comment
import Comment from './comment.schema';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  providers: [CommentsService],
})
export class CommentsModule {}
