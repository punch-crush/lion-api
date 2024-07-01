import { applyDecorators } from '@nestjs/common';
import {
	UseInterceptors,
	CallHandler,
	ExecutionContext,
	NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpException, HttpStatus } from '@nestjs/common';

export function HandleErrors() {
	return applyDecorators(UseInterceptors(new ErrorHandlingInterceptor()));
}

export class ErrorHandlingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			catchError(error => {
				if (error instanceof HttpException) {
					return throwError(() => error);
				} else {
					return throwError(
						() =>
							new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR),
					);
				}
			}),
		);
	}
}
