import { IEntity } from './entity.interface';

export interface IEntityMapper<Aggregate extends IEntity<unknown>, Model> {
  readonly toAggregate: (model: Model) => Aggregate;
  readonly toModel: (aggregate: Aggregate) => Model;
}
