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
  GetByIdReactionResponseDto,
  PatchReactionResponseDto,
  UpdateReactionDto,
} from './dto';

// types
import { ICustomRequest } from 'src/shared/types';
import { ReactionOrderByEnum } from './reaction.types';

// custom decorators
import { ApiQueriesFromDto } from 'src/shared/decorators';

@Controller('reactions')
@ApiTags('Reactions')
export class ReactionsController {
  constructor(private reactionsService: ReactionsService) {}

  @Post('/')
  create(
    @Req() request: ICustomRequest,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    const userId = request.user.id;
    return this.reactionsService.create({ userId, createReactionDto });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged in.',
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
    const userId = request.user.id;
    const reactionId = id;
    return this.reactionsService.delete({ userId, reactionId });
  }

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
      statusCode: HttpStatus.BAD_REQUEST,
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
    const reactionId = id;
    const userId = request.user.id;
    return this.reactionsService.update({
      userId,
      reactionId,
      updateReactionDto,
    });
  }

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
    const reactionId = id;
    return this.reactionsService.getById({ reactionId });
  }
}
