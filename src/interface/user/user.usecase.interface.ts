import { UserDomain } from './user.domain.interface';

export namespace IUserUsecase {
  export type SetUserData = Pick<UserDomain.State, 'username'>;
}

export interface IUserUsecase {
  readonly getPublic: (
    id: UserDomain.State['id'],
  ) => Promise<UserDomain.Public>;
  readonly getDetail: (token: string) => Promise<UserDomain.Detail>;
  readonly update: (
    token: string,
    data: IUserUsecase.SetUserData,
  ) => Promise<void>;
  readonly remove: (token: string) => Promise<void>;
}
