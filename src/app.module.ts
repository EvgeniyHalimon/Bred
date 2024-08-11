// nest
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// config
import { config } from './config';

// library
import { Dialect } from 'sequelize';

// modules
import { UsersModule } from './user/user.module';
import { CommentsModule } from './comment/comment.module';
import { ArticlesModule } from './article/article.module';
import { ReactionsModule } from './reaction/reaction.module';
import { AuthModule } from './auth/auth.module';

// schemas
import { User } from './user/user.schema';
import { Article } from './article/article.schema';
import { Comment } from './comment/comment.schema';
import { Reaction } from './reaction/reaction.schema';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: config.DIALECT as Dialect,
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
