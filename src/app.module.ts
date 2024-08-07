import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './config';
import { User } from './user/schema/user.schema';
import { CommentsModule } from './comments/comments.module';
import { ArticlesModule } from './articles/articles.module';
import { ReactionsModule } from './reactions/reactions.module';
import { Article } from './articles/schema/article.schema';
import { Comment } from './comments/schema/comment.schema';
import { Reaction } from './reactions/schema/reaction.schema';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config.HOST,
      port: config.DB_PORT as number,
      username: config.DB_USERNAME,
      password: config.PASSWORD,
      database: config.DATABASE,
      models: [User, Article, Comment, Reaction],
    }),
    UsersModule,
    CommentsModule,
    ArticlesModule,
    ReactionsModule,
    AuthModule,
  ],
})
export class AppModule {}
