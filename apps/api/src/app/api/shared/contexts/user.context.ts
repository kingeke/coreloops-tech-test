import { IncomingMessage } from 'http';

import { ClsStore } from 'nestjs-cls';

type UserModel = any;

export interface UserStore extends ClsStore {
  user?: UserModel;
  isGlobalAdmin?: boolean;
}

export class UserContext extends IncomingMessage {
  user?: UserModel;
  isGlobalAdmin?: boolean;
}
