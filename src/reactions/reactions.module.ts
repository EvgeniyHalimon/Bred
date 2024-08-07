// nest
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// schema
import { Reaction } from './schema/reaction.schema';

@Module({
  imports: [SequelizeModule.forFeature([Reaction])],
})
export class ReactionsModule {}
