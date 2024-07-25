import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { ICat } from './interfaces/cat.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from 'src/schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<ICat>) {}

  async create(createCatDto: CreateCatDto): Promise<ICat> {
    const createdCat = this.catModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<ICat[]> {
    return this.catModel.find().exec();
  }
}
