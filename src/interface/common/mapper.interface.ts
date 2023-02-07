export interface IEntityMapper<Aggregate, Model> {
  readonly toAggregate: (model: Model) => Aggregate;
  readonly toModel: (aggregate: Aggregate) => Model;
}
