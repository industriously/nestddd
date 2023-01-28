import { Account } from '@INTERFACE/account';

export interface IProfile {
  readonly sub: Account.State['sub'];
  readonly oauth_type: 'github' | 'google';
  readonly username: Account.State['username'];
  /**
   * @format email
   */
  readonly email: Account.State['email'];
}
