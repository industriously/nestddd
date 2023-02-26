export namespace UserSchema {
  export type OauthType = 'google' | 'github';
  export interface Aggregate {
    /**
     * @format uuid
     */
    readonly id: string;
    /**
     * oauth server's user id
     */
    readonly sub: string;
    /**
     * oauth server type
     */
    readonly oauth_type: OauthType;
    /**
     * @format email
     */
    readonly email: string;
    readonly username: string;
    readonly address: string | null;
    /**
     * @pattern ^010-[0-9]{4}-[0-9]{4}$
     */
    readonly phone: string | null;
    readonly is_deleted: boolean;
    readonly created_at: Date;
    readonly updated_at: Date;
  }
  export type OauthProfile = Pick<
    Aggregate,
    'sub' | 'oauth_type' | 'email' | 'username'
  >;
  export type Public = Pick<Aggregate, 'id' | 'email' | 'username'>;
  export interface Detail
    extends Pick<
      Aggregate,
      'id' | 'oauth_type' | 'email' | 'username' | 'address' | 'phone'
    > {
    /**
     * ISO 8601 type
     * @pattern ^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]).[0-9]{3}Z$
     */
    readonly created_at: string;
    /**
     * ISO 8601 type
     * @pattern ^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]).[0-9]{3}Z$
     */
    readonly updated_at: string;
  }
}
