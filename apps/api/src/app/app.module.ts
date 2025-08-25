import { JwtAuthGuardProvider } from '@coreloops-api/shared/guards';
import { DbModule } from '@coreloops-orm/db.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api/api.module';
import { HttpExceptionFilterProvider } from './shared/filters';

@Module({
  imports: [DbModule, ApiModule, ScheduleModule.forRoot()],
  providers: [HttpExceptionFilterProvider, JwtAuthGuardProvider],
})
export class AppModule {}
