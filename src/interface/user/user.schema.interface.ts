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
    /**
     * @pattern ^[\w\d]{8,16}$
     */
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
  export type Detail = Pick<
    Aggregate,
    | 'id'
    | 'sub'
    | 'oauth_type'
    | 'email'
    | 'username'
    | 'address'
    | 'phone'
    | 'created_at'
    | 'updated_at'
  >;
}
