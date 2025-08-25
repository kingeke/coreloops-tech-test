import { randomUUID } from 'node:crypto';

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';

import { TraceStore } from '../contexts';

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TraceMiddleware.name);

  constructor(private readonly cls: ClsService<TraceStore>) {}

  public use(req: Request, res: Response, next: NextFunction): void {
    const requestId = (req.headers['x-request-id'] as string) || randomUUID();
    const trace = { requestId };

    this.cls.set('trace', trace);
    req.trace = trace;

    res.setHeader('x-request-id', requestId);

    next();
  }
}
