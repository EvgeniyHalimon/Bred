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
  CommentPresenter,
  CreateCommentDto,
  DeletedCommentResponseDto,
  GetAllCommentsDto,
  PatchCommentPresenter,
  PostCommentPresenter,
  PatchCommentDto,
  GetAllCommentsPresenter,
} from './dto';

// types
import { ICustomRequest } from 'src/shared/types';
import { CommentOrderByEnum } from './comment.types';

// custom decorator
import { ApiQueriesFromDto, vocabulary } from 'src/shared';

const {
  comments: {
    COMMENT_NOT_FOUND,
    NOT_AUTHOR_OF_COMMENT,
    SUCCESSFUL_DELETE_OF_COMMENT,
  },
} = vocabulary;

@Controller('comments')
@ApiTags('Comments')
export class CommentController {
  constructor(private commentService: CommentsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'When comment created',
    type: PostCommentPresenter,
  })
  @Post('/')
  create(
    @Req() request: ICustomRequest,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentPresenter> {
    return this.commentService.create({
      userId: request.user.id,
      createCommentDto,
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment successfully deleted',
    type: DeletedCommentResponseDto,
  })
  @ApiNotFoundResponse({
    example: {
      message: [COMMENT_NOT_FOUND, NOT_AUTHOR_OF_COMMENT],
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description:
      'When comment is not present in database <br/>  When user is not author of comment',
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
  delete(
    @Req() request: ICustomRequest,
    @Param('id') id: string,
  ): DeletedCommentResponseDto {
    this.commentService.delete({ userId: request.user.id, commentId: id });
    return { message: SUCCESSFUL_DELETE_OF_COMMENT };
  }

  @ApiNotFoundResponse({
    example: {
      message: [COMMENT_NOT_FOUND, NOT_AUTHOR_OF_COMMENT],
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description:
      'When comment is not present in database <br/>  When user is not author of comment',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'When comment updated',
    type: PatchCommentPresenter,
  })
  @Patch('/:id')
  patch(
    @Req() request: ICustomRequest,
    @Param('id') id: string,
    @Body() updateCommentDto: PatchCommentDto,
  ): Promise<PatchCommentPresenter | void> {
    return this.commentService.patch({
      userId: request.user.id,
      commentId: id,
      updateCommentDto,
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Represents array of comments',
    type: GetAllCommentsPresenter,
  })
  @Get('/')
  @ApiQueriesFromDto(GetAllCommentsDto, CommentOrderByEnum)
  findAll(@Query() query: GetAllCommentsDto): Promise<GetAllCommentsPresenter> {
    return this.commentService.findAll(query);
  }
}
