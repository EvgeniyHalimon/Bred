import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { ICat } from './interfaces/cat.interfaces';
import { CatsService } from './cat.service';
import { ZodValidationPipe } from 'src/helpers/ZodValidationPipe';
import { createCatSchema } from './validation/createCatSchema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @UsePipes(new ZodValidationPipe(createCatSchema))
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<ICat[]> {
    return this.catsService.findAll();
  }
}
