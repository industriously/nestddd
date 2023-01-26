import { accounts } from '@PRISMA';

export interface IProfile {
  readonly sub: accounts['sub'];
  readonly oauth_type: 'github' | 'google';
  readonly username: accounts['username'];
  /**
   * @format email
   */
  readonly email: accounts['email'];
}
