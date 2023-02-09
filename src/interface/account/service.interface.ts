import { IProfile } from '@INTERFACE/common';
import { Domain } from './domain.interface';

export namespace Service {}

export interface Service {
  readonly findOne: (id: Domain.State['id']) => Promise<Domain.State>;
  readonly findOneOrCreate: (profile: IProfile) => Promise<Domain.State>;
}
