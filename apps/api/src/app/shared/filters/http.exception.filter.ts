import { ArgumentsHost, Catch, ClassProvider, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { APP_FILTER, BaseExceptionFilter } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter implements ExceptionFilter<HttpException> {
  private readonly httpLogger = new Logger(HttpExceptionFilter.name);

  override catch(exception: HttpException, host: ArgumentsHost): void {
    // Log whatever the exception exposed (string or object)
    try {
      this.httpLogger.warn(JSON.stringify(exception.getResponse()));
    } catch {
      this.httpLogger.warn(String(exception.message));
    }

    // REST only → let BaseExceptionFilter handle formatting + status
    super.catch(exception, host);
  }
}

export const HttpExceptionFilterProvider: ClassProvider = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};
