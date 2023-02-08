import { IProfile } from '@INTERFACE/common';
import { Domain } from './domain.interface';

export namespace Service {
  export type FindOneFilter = Pick<Domain.State, 'id'>;
}

export interface Service {
  readonly findOne: (filter: Service.FindOneFilter) => Promise<Domain.State>;
  readonly findOneOrCreate: (profile: IProfile) => Promise<Domain.State>;
}
