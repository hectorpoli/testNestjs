import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ErrorResponse {
  message: string | string[];
  statusCode: number;
}

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ErrorResponse> {
    return next.handle().pipe(
      catchError((err) =>
        throwError(
          () =>
            new NotFoundException({
              message: err.message,
              statusCode: err.status,
            }),
        ),
      ),
    );
  }
}
