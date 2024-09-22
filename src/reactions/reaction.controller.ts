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
  DeleteReactionResponseDto,
  GetAllQueryReactionsDto,
  GetAllReactionsResponseDto,
  GetByIdReactionResponseDto,
  PatchReactionResponseDto,
  PostReactionResponseDto,
  UpdateReactionDto,
} from './dto';

// types
import { ICustomRequest } from 'src/shared/types';
import { ReactionOrderByEnum } from './reaction.types';

// custom decorators
import { ApiQueriesFromDto } from 'src/shared';

@Controller('reactions')
@ApiTags('Reactions')
export class ReactionsController {
  constructor(private reactionsService: ReactionsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'When comment created',
    type: PostReactionResponseDto,
  })
  @Post('/')
  create(
    @Req() request: ICustomRequest,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    return this.reactionsService.create({
      userId: request.user.id,
      createReactionDto,
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged in',
    type: DeleteReactionResponseDto,
  })
  @ApiNotFoundResponse({
    example: {
      message: 'Reaction not found',
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When reaction is not present in database',
  })
  @ApiNotFoundResponse({
    example: {
      message: 'You are not author of this reaction',
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
  delete(@Req() request: ICustomRequest, @Param('id') id: string) {
    return this.reactionsService.delete({
      userId: request.user.id,
      reactionId: id,
    });
  }

  @ApiBadRequestResponse({
    description: 'When commentId or articleId is not present in request body',
    example: {
      message: 'Either commentId or articleId must be provided',
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @ApiBadRequestResponse({
    description:
      'When you send wrong type of reaction for comment, for example upvote or downvote',
    example: {
      message: 'Wrong reaction types for comment',
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @ApiBadRequestResponse({
    description:
      'When you send wrong type of reaction for article, for example like or dislike',
    example: {
      message: 'Wrong reaction types for article',
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @ApiBadRequestResponse({
    description: 'When you already reacted to this comment',
    example: {
      message: 'You have already reacted to this comment',
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @ApiBadRequestResponse({
    description: 'When you already reacted to this article',
    example: {
      message: 'You have already reacted to this article',
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @ApiNotFoundResponse({
    example: {
      message: 'Reaction not found',
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When reaction is not found',
  })
  @ApiNotFoundResponse({
    description: 'When user is not author of reaction',
    example: {
      message: 'You are not author of this reaction',
      error: 'Bad Request',
      statusCode: HttpStatus.NOT_FOUND,
    },
  })
  @ApiNotFoundResponse({
    description: 'Comment not found',
    example: {
      message: 'When comment that you want to react not found',
      error: 'Bad Request',
      statusCode: HttpStatus.NOT_FOUND,
    },
  })
  @ApiNotFoundResponse({
    description: 'Article not found',
    example: {
      message: 'When article that you want to react not found',
      error: 'Bad Request',
      statusCode: HttpStatus.NOT_FOUND,
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'When reaction updated',
    type: PatchReactionResponseDto,
  })
  @Patch('/:id')
  update(
    @Req() request: ICustomRequest,
    @Param('id') id: string,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    return this.reactionsService.update({
      userId: request.user.id,
      reactionId: id,
      updateReactionDto,
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Represents array of reactions',
    type: GetAllReactionsResponseDto,
  })
  @Get('/')
  @ApiQueriesFromDto(GetAllQueryReactionsDto, ReactionOrderByEnum)
  getAll(@Query() query: GetAllQueryReactionsDto) {
    return this.reactionsService.findAll({ query });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Represents reaction with author of this reaction',
    type: GetByIdReactionResponseDto,
  })
  @ApiNotFoundResponse({
    example: {
      message: 'Reaction not found',
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When reaction is not present in database',
  })
  @Get('/:id')
  get(@Param('id') id: string) {
    return this.reactionsService.getById({ reactionId: id });
  }
}
