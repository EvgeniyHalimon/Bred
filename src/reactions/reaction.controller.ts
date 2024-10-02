// nest
import {
  Body,
  Controller,
  Post,
  Delete,
  Get,
  Req,
  Param,
  Query,
  Patch,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

//service
import { ReactionsService } from './reaction.service';

// dto's
import {
  CreateReactionDto,
  DeleteReactionPresenter,
  GetAllReactionsDto,
  GetAllReactionsPresenter,
  GetByIdReactionPresenter,
  PatchReactionPresenter,
  PostReactionPresenter,
  PatchReactionDto,
} from './dto';

// types
import { ICustomRequest } from 'src/shared/types';
import { ReactionOrderByEnum } from './reaction.types';

// custom decorators
import { ApiQueriesFromDto, vocabulary } from 'src/shared';

const {
  comments: { COMMENT_NOT_FOUND },
  article: { ARTICLE_NOT_FOUND },
  reactions: {
    REACTION_NOT_FOUND,
    NOT_AUTHOR_OF_REACTION,
    WRONG_REACTION_TYPE_FOR_COMMENT,
    WRONG_REACTION_TYPE_FOR_ARTICLE,
    ALREADY_REACTED_TO_ARTICLE,
    ALREADY_REACTED_TO_COMMENT,
    COMMENT_OR_ARTICLE_ID_REQUIRED,
  },
} = vocabulary;

@Controller('reactions')
@ApiTags('Reactions')
export class ReactionsController {
  constructor(readonly reactionsService: ReactionsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'When comment created',
    type: PostReactionPresenter,
  })
  @Post('/')
  create(
    @Req() request: ICustomRequest,
    @Body() createReactionDto: CreateReactionDto,
  ): Promise<PostReactionPresenter> {
    return this.reactionsService.create({
      userId: request.user.id,
      createReactionDto,
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully deleted reaction',
    type: DeleteReactionPresenter,
  })
  @ApiNotFoundResponse({
    example: {
      message: REACTION_NOT_FOUND,
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When reaction is not present in database',
  })
  @ApiNotFoundResponse({
    example: {
      message: NOT_AUTHOR_OF_REACTION,
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When user is not author of this reaction',
  })
  @ApiBadRequestResponse({
    description: 'When delete was not successful',
    example: {
      message: 'Something went wrong while deleting the reactions',
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @Delete('/:id')
  delete(
    @Req() request: ICustomRequest,
    @Param('id') id: string,
  ): Promise<void> {
    return this.reactionsService.delete({
      userId: request.user.id,
      reactionId: id,
    });
  }

  @ApiBadRequestResponse({
    description: 'When commentId or articleId is not present in request body',
    example: {
      message: COMMENT_OR_ARTICLE_ID_REQUIRED,
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @ApiBadRequestResponse({
    description:
      'When you send wrong type of reaction for comment, for example upvote or downvote',
    example: {
      message: WRONG_REACTION_TYPE_FOR_COMMENT,
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @ApiBadRequestResponse({
    description:
      'When you send wrong type of reaction for article, for example like or dislike',
    example: {
      message: WRONG_REACTION_TYPE_FOR_ARTICLE,
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @ApiBadRequestResponse({
    description: 'When you already reacted to this comment',
    example: {
      message: ALREADY_REACTED_TO_COMMENT,
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @ApiBadRequestResponse({
    description: 'When you already reacted to this article',
    example: {
      message: ALREADY_REACTED_TO_ARTICLE,
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @ApiNotFoundResponse({
    example: {
      message: REACTION_NOT_FOUND,
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When reaction is not found',
  })
  @ApiNotFoundResponse({
    description: 'When user is not author of reaction',
    example: {
      message: NOT_AUTHOR_OF_REACTION,
      error: 'Bad Request',
      statusCode: HttpStatus.NOT_FOUND,
    },
  })
  @ApiNotFoundResponse({
    description: COMMENT_NOT_FOUND,
    example: {
      message: COMMENT_NOT_FOUND,
      error: 'Bad Request',
      statusCode: HttpStatus.NOT_FOUND,
    },
  })
  @ApiNotFoundResponse({
    description: ARTICLE_NOT_FOUND,
    example: {
      message: ARTICLE_NOT_FOUND,
      error: 'Bad Request',
      statusCode: HttpStatus.NOT_FOUND,
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'When reaction updated',
    type: PatchReactionPresenter,
  })
  @Patch('/:id')
  patch(
    @Req() request: ICustomRequest,
    @Param('id') id: string,
    @Body() updateReactionDto: PatchReactionDto,
  ): Promise<PatchReactionPresenter> {
    return this.reactionsService.patch({
      userId: request.user.id,
      reactionId: id,
      updateReactionDto,
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Represents array of reactions',
    type: GetAllReactionsPresenter,
  })
  @Get('/')
  @ApiQueriesFromDto(GetAllReactionsDto, ReactionOrderByEnum)
  getAll(
    @Query() query: GetAllReactionsDto,
  ): Promise<GetAllReactionsPresenter> {
    return this.reactionsService.findAll(query);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Represents reaction with author of this reaction',
    type: GetByIdReactionPresenter,
  })
  @ApiNotFoundResponse({
    example: {
      message: REACTION_NOT_FOUND,
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When reaction is not present in database',
  })
  @Get('/:id')
  get(@Param('id') id: string): Promise<GetByIdReactionPresenter> {
    return this.reactionsService.getById({ reactionId: id });
  }
}
