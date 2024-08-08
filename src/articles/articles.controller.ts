// nest
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
} from '@nestjs/common';

// service
import { ArticlesService } from './articles.service';

// dto
import { CreateArticleDto } from './dto/create-article.dto';
import { ICustomRequest } from 'src/shared/types';
import { PatchArticleDto } from './dto/patch-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post('/')
  async create(
    @Req() request: ICustomRequest,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articlesService.create({
      user: request.user,
      createArticleDto,
    });
  }

  @Get('/:id')
  async getById(@Req() request: ICustomRequest) {
    const articleId = request.params.id;
    return this.articlesService.getById({ articleId });
  }

  @Patch('/:id')
  async patchById(
    @Req() request: ICustomRequest,
    @Body() patchArticleDto: PatchArticleDto,
  ) {
    const articleId = request.params.id;
    const userId = request.user.id;
    return this.articlesService.patchById({
      articleId,
      userId,
      patchArticleDto,
    });
  }

  @Delete('/:id')
  async deleteById(@Req() request: ICustomRequest) {
    const articleId = request.params.id;
    const userId = request.user.id;
    return this.articlesService.deleteById({ articleId, userId });
  }
}
