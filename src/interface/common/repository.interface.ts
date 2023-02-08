import { IEntity } from './entity.interface';

export interface IRepository<Aggregate extends IEntity<IId>, IId = unknown> {
  readonly findOne: (
    id: IId,
    include_deleted: boolean,
  ) => Promise<Aggregate | null>;
  readonly findMany: (filter: any, option: any) => Promise<Aggregate[]>;
  readonly save: (aggregate: Aggregate) => Promise<void>;
  readonly remove: (id: IId) => Promise<void>;
}
