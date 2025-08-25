import { Request, Response } from 'express';
import { AuthContext } from './auth.context';
import { TraceContext } from './trace.context';
import { UserContext } from './user.context';

export interface ApiContext {
  req?: AuthContext & TraceContext & UserContext & Request;
  res: Response;
}

declare module 'express' {
  interface Request extends AuthContext, TraceContext, UserContext {}
}
