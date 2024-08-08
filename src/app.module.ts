// nest
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// config
import { config } from './config';

// modules
import { UsersModule } from './user/user.module';
import { CommentsModule } from './comments/comments.module';
import { ArticlesModule } from './articles/articles.module';
import { ReactionsModule } from './reactions/reactions.module';
import { AuthModule } from './auth/auth.module';

// schemas
import { User } from './user/schema/user.schema';
import { Article } from './articles/schema/article.schema';
import { Comment } from './comments/schema/comment.schema';
import { Reaction } from './reactions/schema/reaction.schema';

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
