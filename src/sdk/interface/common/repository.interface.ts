import { IEntity } from './entity.interface';

export interface IRepository<Aggregate extends IEntity<IId>, IId = unknown> {
  readonly findOne: (
    include_deleted?: boolean,
  ) => (id: IId) => Promise<Aggregate | null>;
  readonly create: (data: Aggregate) => Promise<Aggregate>;
  readonly update: (data: Aggregate) => (id: IId) => Promise<void>;
  readonly save: (aggregate: Aggregate) => Promise<Aggregate>;
  readonly remove: (id: IId) => Promise<void>;
}
