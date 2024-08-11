// nest
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';

// service
import { ArticlesService } from './article.service';

// dto
import { CreateArticleDto } from './dto/create-article.dto';
import { PatchArticleDto } from './dto/patch-article.dto';

// types
import { ICustomRequest, OrderType } from 'src/shared/types';
import { IArticle, IQueryFindAllArticles } from './article.types';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post('/')
  async create(
    @Req() request: ICustomRequest,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    const userId = request.user.id;
    const createdArticle = await this.articlesService.create({
      userId,
      createArticleDto,
    });
    return {
      data: { article: createdArticle },
      message: `Article "${createArticleDto.title}" created successfully`,
    };
  }

  @Get('/:id')
  async getById(@Req() request: ICustomRequest, @Param('id') id: string) {
    const articleId = id;
    const article = await this.articlesService.getById({ articleId });
    return { data: { article } };
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
    const updatedArticle = await this.articlesService.patchById({
      articleId,
      userId,
      patchArticleDto,
    });

    return {
      data: {
        article: updatedArticle,
      },
      message: `Article "${updatedArticle?.title}" updated successfully`,
    };
  }

  @Delete('/:id')
  async deleteById(@Req() request: ICustomRequest) {
    const articleId = request.params.id;
    const userId = request.user.id;
    await this.articlesService.deleteById({ articleId, userId });
    return { message: 'Article deleted successfully' };
  }
}
