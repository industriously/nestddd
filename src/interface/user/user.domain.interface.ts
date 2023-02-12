import { User as Model } from '@PRISMA';

export namespace UserDomain {
  export type State = Readonly<Model>;
  export type OauthType = 'google' | 'github';

  export type Public = Pick<State, 'id' | 'email' | 'username'>;
  export type Detail = Pick<
    State,
    | 'id'
    | 'sub'
    | 'oauth_type'
    | 'email'
    | 'username'
    | 'phone'
    | 'address'
    | 'created_at'
    | 'updated_at'
  >;
}
