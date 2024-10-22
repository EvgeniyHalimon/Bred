// nest
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
//import { APP_FILTER } from '@nestjs/core';

// config
import { config } from './config';

// library
import { Dialect } from 'sequelize';
import { join } from 'path';
//import { LoggerModule } from 'nestjs-pino';

// modules
import { UsersModule } from './users/user.module';
import { CommentsModule } from './comments/comment.module';
import { ArticlesModule } from './articles/article.module';
import { ReactionsModule } from './reactions/reaction.module';
import { AuthModule } from './auth/auth.module';

// middleware
import { CorsMiddleware } from './shared/cors.middleware';

// exception filter
//import { HttpExceptionFilter } from './filters';

const dialectOptions = process.env.NODE_ENV === 'production' && {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
      ca: config.MYSQL_SSL_CERT,
    },
  },
};

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: config.DIALECT as Dialect,
      host: config.HOST,
      port: config.DB_PORT,
      username: config.DB_USERNAME,
      password: config.PASSWORD,
      database: config.DATABASE,
      autoLoadModels: true,
      synchronize: true,
      models: [join(__dirname, '**', '*.schema.{ts,js}')],
      ...dialectOptions,
    }),
    /* LoggerModule.forRoot({
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
    }), */
    UsersModule,
    CommentsModule,
    ArticlesModule,
    ReactionsModule,
    AuthModule,
  ],
  //remove before deploy
  //providers: [
  //  {
  //    provide: APP_FILTER,
  //    useClass: HttpExceptionFilter,
  //  },
  //],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
