// nest
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// config
import { config } from './config';

// library
import { Dialect } from 'sequelize';
import { join } from 'path';
import { LoggerModule } from 'nestjs-pino';

// modules
import { UsersModule } from './user/user.module';
import { CommentsModule } from './comment/comment.module';
import { ArticlesModule } from './article/article.module';
import { ReactionsModule } from './reaction/reaction.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: config.DIALECT as Dialect,
      host: config.HOST,
      port: config.DB_PORT as number,
      username: config.DB_USERNAME,
      password: config.PASSWORD,
      database: config.DATABASE,
      autoLoadModels: true,
      synchronize: true,
      models: [join(__dirname, '**', '*.schema.{ts,js}')],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            levelFirst: true,
            hideObject: false,
            errorLikeObjectKeys: ['err', 'error'],
            errorProps: 'message,stack,code',
          },
        },
      },
    }),
    UsersModule,
    CommentsModule,
    ArticlesModule,
    ReactionsModule,
    AuthModule,
  ],
})
export class AppModule {}
