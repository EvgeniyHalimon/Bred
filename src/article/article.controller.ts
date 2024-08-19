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
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// service
import { ArticlesService } from './article.service';

// dtos
import {
  GetAllQueryArticlesDto,
  CreateArticleDto,
  PatchArticleDto,
  CreateArticleResponseDto,
  DeletedArticleResponseDto,
  UpdatedArticleResponseDto,
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
      article: createdArticle,
      message: `Article "${createArticleDto.title}" created successfully`,
    };
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const articleId = id;
    const article = await this.articlesService.getById({ articleId });
    return { article };
  }

  @Get('/')
  @ApiQueriesFromDto(GetAllQueryArticlesDto, ArticleOrderByEnum)
  async getAll(@Query() query: GetAllQueryArticlesDto) {
    return this.articlesService.findAll({ query });
  }

  @ApiNotFoundResponse({
    example: {
      message: 'Article not found',
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When article is not present in database',
  })
  @ApiNotFoundResponse({
    example: {
      message: 'You are not author of this article',
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When user is not author of article',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'When article successfully updated',
    type: UpdatedArticleResponseDto,
  })
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
      article: updatedArticle,
      message: `Article "${updatedArticle?.title}" updated successfully`,
    };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged in.',
    type: DeletedArticleResponseDto,
  })
  @ApiNotFoundResponse({
    example: {
      message: 'Article not found',
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When article is not present in database',
  })
  @ApiNotFoundResponse({
    example: {
      message: 'You are not author of this article',
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When user is not author of article',
  })
  @ApiBadRequestResponse({
    description: 'When delete was not successful',
    example: {
      message: 'Something went wrong while deleting the article',
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @Delete('/:id')
  async deleteById(@Req() request: ICustomRequest) {
    const articleId = request.params.id;
    const userId = request.user.id;
    await this.articlesService.deleteById({ articleId, userId });
    return { message: 'Article deleted successfully' };
  }
}
