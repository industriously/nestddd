import { UserSchema } from './user.schema.interface';

export namespace IAuthUsecase {
  export type SignInResponse = Pick<UserSchema.Aggregate, 'id'>;
}

export interface IAuthUsecase {
  readonly signIn: (
    profile: UserSchema.OauthProfile,
  ) => Promise<IAuthUsecase.SignInResponse>;
}
