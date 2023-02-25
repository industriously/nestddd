import { UserSchema } from './user.schema.interface';

export namespace IUserUsecase {
  export type UpdateData = Partial<
    Pick<UserSchema.Aggregate, 'username' | 'address' | 'phone'>
  >;
}

export interface IUserUsecase {
  readonly getPublic: (
    id: UserSchema.Aggregate['id'],
  ) => Promise<UserSchema.Public>;

  readonly getDetail: (token: string) => Promise<UserSchema.Detail>;

  readonly update: (
    token: string,
    data: IUserUsecase.UpdateData,
  ) => Promise<void>;

  readonly remove: (token: string) => Promise<void>;
}
