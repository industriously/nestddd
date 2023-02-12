import { UserDomain } from './user.domain.interface';

export namespace IUserUsecase {
  export type UpdateUserData = Pick<UserDomain.State, 'username'>;
}

export interface IUserUsecase {
  readonly getPublic: (
    id: UserDomain.State['id'],
  ) => Promise<UserDomain.Public>;
  readonly getDetail: (token: string) => Promise<UserDomain.Detail>;
  readonly update: (
    token: string,
    data: IUserUsecase.UpdateUserData,
  ) => Promise<void>;
  readonly remove: (token: string) => Promise<void>;
}
