import { IncomingMessage } from 'http';

import { ClsStore } from 'nestjs-cls';

export interface Trace {
  requestId: string;
}

export interface TraceStore extends ClsStore {
  trace?: Trace;
}

export class TraceContext extends IncomingMessage {
  trace?: Trace;
}
