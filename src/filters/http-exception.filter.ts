// libraries
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// types
import { ICustomRequest, IError } from '../shared';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { url, method } = ctx.getRequest<ICustomRequest>();

    const status = exception.getStatus();
    const res = exception.getResponse() as IError;
    const logMessage = `🕔 Date: [${new Date().toISOString()}]\n🎫 Method: ${method}\n🔗Link: ${url}\n📃 Status: ${status}\n🛑 Error: ${res.error}\n💬 Message: ${res.message}\n\n`;

    const logDir = join(__dirname, '../logs');
    const logFilePath = join(logDir, 'error.log');

    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }

    appendFileSync(logFilePath, logMessage);

    response.status(status).json(res);
  }
}
