import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClsMiddleware, ClsModule } from 'nestjs-cls';

import { RestApiModule } from './rest/rest.api.module';
import { AuthMiddleware, TraceMiddleware } from './shared/middlewares';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    RestApiModule,
  ],
})
export class ApiModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware, TraceMiddleware, AuthMiddleware).forRoutes('*');
  }
}
