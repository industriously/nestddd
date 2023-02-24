import { IEntity } from './entity.interface';

export interface IRepository<Aggregate extends IEntity<IId>, IId = unknown> {
  readonly findOne: (
    id: IId,
    include_deleted?: boolean,
  ) => Promise<Aggregate | null>;
  readonly create: (data: Aggregate) => Promise<Aggregate>;
  readonly update: (id: IId, data: Aggregate) => Promise<void>;
  readonly save: (aggregate: Aggregate) => Promise<Aggregate>;
  readonly remove: (id: IId) => Promise<void>;
}
