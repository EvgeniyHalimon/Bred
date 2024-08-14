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
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

//service
import { ReactionsService } from './reaction.service';

// dto's
import {
  CreateReactionDto,
  GetAllQueryReactionsDto,
  UpdateReactionDto,
} from './dto';

// types
import { ICustomRequest } from 'src/shared/types';

@Controller('reactions')
export class ReactionsController {
  constructor(private reactionsService: ReactionsService) {}

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(
    @Req() request: ICustomRequest,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    const userId = request.user.id;
    return this.reactionsService.create({ userId, createReactionDto });
  }

  @Delete('/:id')
  delete(@Req() request: ICustomRequest, @Param('id') id: string) {
    const userId = request.user.id;
    const reactionId = id;
    return this.reactionsService.delete({ userId, reactionId });
  }

  @Put('/:id')
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
  getAll(@Query() query: GetAllQueryReactionsDto) {
    return this.reactionsService.findAll({ query });
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    const reactionId = id;
    return this.reactionsService.getById({ reactionId });
  }
}
