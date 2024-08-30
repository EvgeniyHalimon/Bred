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
import { CommentsService } from './comment.service';

// dto's
import {
  CreateCommentDto,
  DeletedCommentResponseDto,
  GetAllCommentsResponseDto,
  GetAllQueryCommentsDto,
  PatchCommentResponseDto,
  PostCommentResponseDto,
  UpdateCommentDto,
} from './dto';

// types
import { ICustomRequest } from 'src/shared/types';
import { CommentOrderByEnum } from './comment.types';

// custom decorator
import { ApiQueriesFromDto } from 'src/shared';

@Controller('comments')
@ApiTags('Comments')
export class CommentController {
  constructor(private commentService: CommentsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'When comment created',
    type: PostCommentResponseDto,
  })
  @Post('/')
  create(
    @Req() request: ICustomRequest,
    @Body() createReactionDto: CreateCommentDto,
  ) {
    const userId = request.user.id;
    return this.commentService.create({ userId, createReactionDto });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged in.',
    type: DeletedCommentResponseDto,
  })
  @ApiNotFoundResponse({
    example: {
      message: 'Comment not found',
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When comment is not present in database',
  })
  @ApiNotFoundResponse({
    example: {
      message: 'You are not author of this comment',
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When user is not author of comment',
  })
  @ApiBadRequestResponse({
    description: 'When delete was not successful',
    example: {
      message: 'Something went wrong while deleting the comment',
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @Delete('/:id')
  delete(@Req() request: ICustomRequest, @Param('id') id: string) {
    const userId = request.user.id;
    this.commentService.deleteById({ userId, commentId: id });
    return { message: 'Comment deleted successfully' };
  }

  @ApiNotFoundResponse({
    example: {
      message: 'Comment not found',
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When comment is not found',
  })
  @ApiNotFoundResponse({
    description: 'When user is not author of comment',
    example: {
      message: 'You are not author of this comment',
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'When comment updated',
    type: PatchCommentResponseDto,
  })
  @Patch('/:id')
  patch(
    @Req() request: ICustomRequest,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): PatchCommentResponseDto {
    const userId = request.user.id;
    return this.commentService.patch({
      userId,
      commentId: id,
      updateCommentDto,
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Represents array of comments',
    type: GetAllCommentsResponseDto,
  })
  @Get('/')
  @ApiQueriesFromDto(GetAllQueryCommentsDto, CommentOrderByEnum)
  getAll(@Query() query: GetAllQueryCommentsDto) {
    return this.commentService.findAll({ query });
  }
}
