export interface IRepository<Aggregate, Id> {
  readonly findOne: (
    id: Id,
    include_deleted: boolean,
  ) => Promise<Aggregate | null>;
  readonly findMany: (filter: any, option: any) => Promise<Aggregate[]>;
  readonly save: (aggregate: Aggregate) => Promise<void>;
  readonly remove: (id: Id, soft_delete: boolean) => Promise<void>;
}
