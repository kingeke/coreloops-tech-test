import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';

import { AuthStore } from '../contexts/auth.context';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly cls: ClsService<AuthStore>) {}

  public use(req: Request, res: Response, next: NextFunction): void {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    const refreshToken = req.cookies['refresh_token'] as string;
    const auth = { type, token, refreshToken };

    this.cls.set('auth', auth);
    req.auth = auth;

    next();
  }
}
