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
import { PatchArticleDto } from './dto/patch-article.dto';

// types
import { ICustomRequest, OrderType } from 'src/shared/types';
import {
  IArticle,
  IQueryFindAllArticles,
} from './interfaces/article.interfaces';

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

  @Get('/')
  async getAll(@Req() request: ICustomRequest) {
    const { page, limit, title, order, orderBy } = request.query;
    const queries: IQueryFindAllArticles = {
      offset: page ? (Number(page) - 1) * (limit ? Number(limit) : 10) : 0,
      limit: limit ? Number(limit) : 10,
      order: (order as OrderType) ?? 'DESC',
      orderBy: (orderBy as keyof IArticle) ?? 'createdAt',
      title: typeof title === 'string' ? title : undefined,
    };
    return this.articlesService.findAll({ queries });
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
