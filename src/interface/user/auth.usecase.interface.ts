import { UserSchema } from './user.schema.interface';

export namespace IAuthUsecase {
  export type SignInResult = Pick<UserSchema.Aggregate, 'id'>;
}

export interface IAuthUsecase {
  readonly signIn: (
    profile: UserSchema.OauthProfile,
  ) => Promise<IAuthUsecase.SignInResult>;
}
