import { IncomingMessage } from 'http';

import { ClsStore } from 'nestjs-cls';

export interface Auth {
  type: string;
  token: string;
  refreshToken?: string;
}

export interface AuthStore extends ClsStore {
  auth?: Auth;
}

export class AuthContext extends IncomingMessage {
  auth?: Auth;
}
