import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cat/cat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CatsModule, MongooseModule.forRoot('mongodb://localhost/test')],
})
export class AppModule {}
