import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './modules/cat/cat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CatsModule, MongooseModule.forRoot('mongodb://localhost/test')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
