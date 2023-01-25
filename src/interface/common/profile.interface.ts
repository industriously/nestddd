export interface IProfile {
  readonly sub: string;
  readonly oauth_type: 'github' | 'google';
  readonly username: string;
  /**
   * @format email
   */
  readonly email: string;
}
