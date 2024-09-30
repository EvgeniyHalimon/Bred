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
  DeletedArticleDto,
  DetailedArticlePresenter,
  ArticlePresenter,
  GetAllArticlesPresenter,
} from './dto';

// types
import { ArticleOrderByEnum } from './article.types';
import { ICustomRequest, ApiQueriesFromDto, vocabulary } from 'src/shared';

const {
  article: {
    NOT_AUTHOR_OF_ARTICLE: NOT_AUTHOR,
    ARTICLE_NOT_FOUND: NOT_FOUND,
    SUCCESSFUL_DELETE_OF_ARTICLE: SUCCESSFUL_DELETE,
  },
} = vocabulary;

@Controller('articles')
@ApiTags('Articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Article successfully created.',
    type: ArticlePresenter,
  })
  @Post('/')
  create(
    @Req() request: ICustomRequest,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticlePresenter> {
    return this.articlesService.create({
      authorId: request.user.id,
      createArticleDto,
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'When we received the article by id',
    type: DetailedArticlePresenter,
  })
  @ApiNotFoundResponse({
    example: {
      message: NOT_FOUND,
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When article is not present in database',
  })
  @Get('/:id')
  getById(@Param('id') id: string): Promise<DetailedArticlePresenter | null> {
    return this.articlesService.getById({ articleId: id });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'When we received the article by id',
    type: GetAllArticlesPresenter,
  })
  @Get('/')
  @ApiQueriesFromDto(GetAllQueryArticlesDto, ArticleOrderByEnum)
  findAll(
    @Query() query: GetAllQueryArticlesDto,
  ): Promise<GetAllArticlesPresenter> {
    return this.articlesService.findAll(query);
  }

  @ApiNotFoundResponse({
    example: {
      message: NOT_FOUND,
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When article is not present in database',
  })
  @ApiNotFoundResponse({
    example: {
      message: NOT_AUTHOR,
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When user is not author of article',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'When article successfully updated',
    type: ArticlePresenter,
  })
  @Patch('/:id')
  patch(
    @Req() request: ICustomRequest,
    @Body() patchArticleDto: PatchArticleDto,
    @Param('id') id: string,
  ): Promise<ArticlePresenter> {
    return this.articlesService.patch({
      articleId: id,
      userId: request.user.id,
      patchArticleDto,
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged in.',
    type: DeletedArticleDto,
  })
  @ApiNotFoundResponse({
    example: {
      message: NOT_FOUND,
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When article is not present in database',
  })
  @ApiNotFoundResponse({
    example: {
      message: NOT_AUTHOR,
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
  delete(
    @Req() request: ICustomRequest,
    @Param('id') id: string,
  ): DeletedArticleDto {
    this.articlesService.delete({
      articleId: id,
      userId: request.user.id,
    });
    return { message: SUCCESSFUL_DELETE };
  }
}
