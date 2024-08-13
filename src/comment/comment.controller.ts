// nest
import {
  Body,
  Controller,
  Post,
  Delete,
  Put,
  Get,
  Req,
  Param,
} from '@nestjs/common';

//service
import { CommentsService } from './comment.service';

// dto's
import { CreateCommentDto } from './dto/create-comments.dto';

// types
import { ICustomRequest } from 'src/shared/types';

@Controller('reaction')
export class ReactionsController {
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

  @Put('/:id')
  update(
    @Req() request: ICustomRequest,
    @Param('id') id: string,
    @Body() updateCommentDto: any,
  ) {
    const userId = request.user.id;
    return this.commentService.update({
      userId,
      commentId: id,
      updateCommentDto,
    });
  }

  @Get('/')
  getAll() {
    return this.commentService.findAll();
  }
}
