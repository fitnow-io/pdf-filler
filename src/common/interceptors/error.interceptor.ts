import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FastifyReply as Response } from 'fastify';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppLogger } from 'src/modules/logger/app-logger.service';
import { ServerError } from '../errors';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res: Response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          res
            .status(error.getStatus())
            .send(JSON.stringify(error.getResponse()));
        } else {
          return throwError(new ServerError());
        }
        return throwError(error);
      }),
    );
  }
}
