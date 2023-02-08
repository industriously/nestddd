import { IProfile } from '@INTERFACE/common';
import { Domain } from './domain.interface';

export namespace Usecase {
  export type SignInResponse = Pick<Domain.State, 'id'>;
}

export interface Usecase {
  readonly signIn: (profile: IProfile) => Promise<Usecase.SignInResponse>;
}
