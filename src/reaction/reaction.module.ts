// nest
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// modules
import { CommentsModule } from 'src/comment/comment.module';
import { ArticlesModule } from 'src/article/article.module';

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
