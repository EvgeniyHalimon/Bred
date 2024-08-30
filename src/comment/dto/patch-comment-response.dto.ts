import { UniteClasses } from 'src/shared';
import Comment from '../comment.schema';
import { CommentDto } from './comment.dto';

export class PatchCommentResponseDto extends UniteClasses([
  CommentDto,
  Comment,
]) {}
