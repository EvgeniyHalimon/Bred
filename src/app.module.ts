import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './config';
import { User } from './schemas/user.schema';
import { CommentsModule } from './modules/comments/comments.module';
import { ArticlesModule } from './modules/articles/articles.module';

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
  ],
})
export class AppModule {}
