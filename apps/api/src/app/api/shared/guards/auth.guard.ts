import { BaseGuard } from '@coreloops-api/shared/guards/base.guard';
import {
  CanActivate,
  ClassProvider,
  ExecutionContext,
  Injectable,
  Logger,
  SetMetadata,
} from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { ClsService } from 'nestjs-cls';
import { UserStore } from '../contexts';

export const Public = () => SetMetadata('isPublic', true);
export const ExternalWebhook = () => SetMetadata('isExternalWebhook', true);
@Injectable()
export class JwtAuthGuard extends BaseGuard implements CanActivate {
  private readonly reflector = new Reflector();
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    protected readonly cls: ClsService<UserStore>,
  ) {
    super(cls);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export const JwtAuthGuardProvider: ClassProvider = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};
