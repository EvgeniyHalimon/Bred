import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cat/cat.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './config';

@Module({
  imports: [
    CatsModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config.HOST,
      port: config.PORT as number,
      username: config.USERNAME,
      password: config.PASSWORD,
      database: config.DATABASE,
      models: [],
    }),
  ],
})
export class AppModule {}
