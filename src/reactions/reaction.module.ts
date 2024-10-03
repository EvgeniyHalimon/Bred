// nest
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// modules
import { CommentsModule } from 'src/comments/comment.module';
import { ArticlesModule } from 'src/articles/article.module';

// controller
import { ReactionsController } from './reaction.controller';
import { ReactionsService } from './reaction.service';
// schema
import Reaction from './reaction.schema';

@Module({
  imports: [
    SequelizeModule.forFeature([Reaction]),
    CommentsModule,
    ArticlesModule,
  ],
  controllers: [ReactionsController],
  providers: [ReactionsService],
})
export class ReactionsModule {}
