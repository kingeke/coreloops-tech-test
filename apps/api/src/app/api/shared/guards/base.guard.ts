import { Auth, UserStore } from '@coreloops-api/shared/contexts';
import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';

type CoreloopsRequest = Request & { auth?: Auth; user?: Record<string, string> };

@Injectable()
export abstract class BaseGuard implements CanActivate {
  protected constructor(protected readonly cls: ClsService<UserStore>) {}

  public assignUserToRequestAndStore(user: Record<string, string>, tenantId: string, request: CoreloopsRequest) {
    if (!user || !tenantId) {
      throw new HttpException('Missing user or tenant ID', 400);
    }

    const userModel = { currentTenantId: tenantId, ...user };
    request.user = userModel;
    this.cls.set('user', userModel);
  }

  abstract canActivate(context: ExecutionContext): Promise<boolean>;

  public getRequest(context: ExecutionContext): {
    request: CoreloopsRequest;
    response: Response;
  } {
    const httpCtx = context.switchToHttp();
    return {
      request: httpCtx.getRequest<CoreloopsRequest>(),
      response: httpCtx.getResponse<Response>(),
    };
  }
}
