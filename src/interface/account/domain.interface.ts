export namespace Domain {
  export interface State {
    readonly id: string;
    readonly sub: string;
    readonly oauth_type: string;
    /**
     * @format email
     */
    readonly email: string;
    readonly username: string;
    readonly created_at: Date;
    readonly updated_at: Date;
  }
  export type OauthType = 'google' | 'github';
  export type Public = Pick<State, 'id' | 'email' | 'username'>;
  export type Detail = State;
}
