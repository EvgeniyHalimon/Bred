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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

//service
import { CommentsService } from './comment.service';

// dto's
import {
  CreateCommentDto,
  GetAllQueryCommentsDto,
  UpdateCommentDto,
} from './dto';

// types
import { ICustomRequest } from 'src/shared/types';
import { CommentOrderByEnum } from './comment.types';

// custom decorator
import { ApiQueriesFromDto } from 'src/shared/decorators';

@Controller('comments')
@ApiTags('Comments')
export class CommentController {
  constructor(private commentService: CommentsService) {}

  @Post('/')
  create(
    @Req() request: ICustomRequest,
    @Body() createReactionDto: CreateCommentDto,
  ) {
    const userId = request.user.id;
    return this.commentService.create({ userId, createReactionDto });
  }

  @Delete('/:id')
  delete(@Req() request: ICustomRequest, @Param('id') id: string) {
    const userId = request.user.id;
    return this.commentService.deleteById({ userId, commentId: id });
  }

  @Patch('/:id')
  update(
    @Req() request: ICustomRequest,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const userId = request.user.id;
    return this.commentService.update({
      userId,
      commentId: id,
      updateCommentDto,
    });
  }

  @Get('/')
  @ApiQueriesFromDto(GetAllQueryCommentsDto, CommentOrderByEnum)
  getAll(@Query() query: GetAllQueryCommentsDto) {
    return this.commentService.findAll({ query });
  }
}
