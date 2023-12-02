import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (response && typeof response === 'object') {
          return {
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: 'Success',
            data: response,
          };
        } else {
          return response;
        }
      }),
    );
  }
}
