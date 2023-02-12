import { UserDomain } from '@INTERFACE/user';

export interface IProfile {
  readonly sub: UserDomain.State['sub'];
  readonly oauth_type: UserDomain.OauthType;
  /**
   * @pattern ^[\w\d]{8,16}$
   */
  readonly username: UserDomain.State['username'];
  /**
   * @format email
   */
  readonly email: UserDomain.State['email'];
}
