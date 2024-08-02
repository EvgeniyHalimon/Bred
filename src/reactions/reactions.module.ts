import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reaction } from './schema/reaction.schema';

@Module({
  imports: [SequelizeModule.forFeature([Reaction])],
})
export class ReactionsModule {}
