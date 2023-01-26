import { accounts } from '@PRISMA';
import { Session } from 'express-session';

export namespace AccountAPI {
  type Account = Pick<accounts, 'id'>;
  export type ISession = Session & {
    account: Account;
  };

  export interface SignInResponse {
    readonly access_token: string;
    readonly refresh_token: string;
  }
}
