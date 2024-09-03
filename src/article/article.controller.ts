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
  GetByIdArticleResponseDto,
  GetAllArticlesResponseDto,
} from './dto';

// types
import { ArticleOrderByEnum, IArticleResponse } from './article.types';
import {
  ICustomRequest,
  ApiQueriesFromDto,
  ISimpleMessageResponse,
} from 'src/shared';

@Controller('articles')
@ApiTags('Articles')
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
  ): Promise<IArticleResponse> {
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'When we received the article by id',
    type: GetByIdArticleResponseDto,
  })
  @ApiNotFoundResponse({
    example: {
      message: 'Article not found',
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When article is not present in database',
  })
  @Get('/:id')
  async getById(@Param('id') id: string) {
    const articleId = id;
    const article = await this.articlesService.getById({ articleId });
    return article;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'When we received the article by id',
    type: GetAllArticlesResponseDto,
  })
  @Get('/')
  @ApiQueriesFromDto(GetAllQueryArticlesDto, ArticleOrderByEnum)
  async findAll(
    @Query() query: GetAllQueryArticlesDto,
  ): Promise<GetAllArticlesResponseDto> {
    return await this.articlesService.findAll({ query });
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
  async patch(
    @Req() request: ICustomRequest,
    @Body() patchArticleDto: PatchArticleDto,
    @Param('id') id: string,
  ): Promise<IArticleResponse> {
    const articleId = id;
    const userId = request.user.id;
    const updatedArticle = await this.articlesService.patch({
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
  async delete(
    @Req() request: ICustomRequest,
    @Param('id') id: string,
  ): Promise<ISimpleMessageResponse> {
    const articleId = id;
    const userId = request.user.id;
    await this.articlesService.delete({ articleId, userId });
    return { message: 'Article deleted successfully' };
  }
}
