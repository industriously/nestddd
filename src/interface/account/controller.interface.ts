import { Session } from 'express-session';
import { Account } from './domain.interface';

export namespace AccountAPI {
  export type ISession = Session & {
    account: Pick<Account.State, 'id'>;
  };

  export interface SignInResponse {
    readonly access_token: string;
    readonly refresh_token: string;
  }
}
