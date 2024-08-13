// nest
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';

// service
import { ArticlesService } from './article.service';

// dto
import { CreateArticleDto } from './dto/create-article.dto';
import { PatchArticleDto } from './dto/patch-article.dto';

// types
import { ICustomRequest } from 'src/shared/types';
import { GetAllQueryArticlesDto } from './dto';

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
  async getAll(@Query() query: GetAllQueryArticlesDto) {
    return this.articlesService.findAll({ query });
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
