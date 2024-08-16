// nest
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// service
import { ArticlesService } from './article.service';

// dtos
import {
  GetAllQueryArticlesDto,
  CreateArticleDto,
  PatchArticleDto,
  CreateArticleResponseDto,
} from './dto';

// types
import { ICustomRequest } from 'src/shared/types';
import { ArticleOrderByEnum } from './article.types';

// custom decorator
import { ApiQueriesFromDto } from 'src/shared/decorators';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully logged in.',
    type: CreateArticleResponseDto,
  })
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
  async getById(@Param('id') id: string) {
    const articleId = id;
    const article = await this.articlesService.getById({ articleId });
    return { data: { article } };
  }

  @Get('/')
  @ApiQueriesFromDto(GetAllQueryArticlesDto, ArticleOrderByEnum)
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
