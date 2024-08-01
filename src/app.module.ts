import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './config';
import { User } from './user/schema/user.schema';
import { CommentsModule } from './comments/comments.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { ReactionsModule } from './reactions/reactions.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config.HOST,
      port: config.PORT as number,
      username: config.USERNAME,
      password: config.PASSWORD,
      database: config.DATABASE,
      models: [User],
    }),
    UsersModule,
    CommentsModule,
    ArticlesModule,
    AuthModule,
    ReactionsModule,
  ],
})
export class AppModule {}
