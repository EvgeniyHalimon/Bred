import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { IError } from '../shared';

@Catch(HttpException)
export class FileValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const message = (exceptionResponse as any).message;

    const errorResponse: IError = {
      message,
      error: 'Bad Request',
      statusCode: status,
    };

    response.status(status).json(errorResponse);
  }
}
