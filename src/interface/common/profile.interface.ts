import { Domain } from '@INTERFACE/account';

export interface IProfile {
  readonly sub: Domain.State['sub'];
  readonly oauth_type: 'github' | 'google';
  readonly username: Domain.State['username'];
  /**
   * @format email
   */
  readonly email: Domain.State['email'];
}
