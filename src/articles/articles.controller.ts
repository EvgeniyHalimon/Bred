// nest
import { Body, Controller, Post } from '@nestjs/common';

// service
import { ArticlesService } from './articles.service';

// dto
import { CreateArticleDto } from './dto/create-article.dto';
import { ICustomRequest } from 'src/shared/types';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post('/')
  async create(
    @Body() request: ICustomRequest,
    createArticleDto: CreateArticleDto,
  ) {
    console.log(
      '🚀 ~ file: articles.controller.ts:17 ~ ArticlesController ~ create ~ request:',
      request.user,
    );
    console.log(
      '🚀 ~ file: articles.controller.ts:17 ~ ArticlesController ~ create ~ createArticleDto:',
      createArticleDto,
    );
    return this.articlesService.create({
      user: request.user,
      createArticleDto,
    });
  }
}
