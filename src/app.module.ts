import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './config';
import { User } from './schemas/user.schema';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config.HOST,
      port: config.PORT as number,
      username: config.USERNAME,
      password: config.PASSWORD,
      database: config.DATABASE,
      models: [User],
    }),
  ],
})
export class AppModule {}
