import { DBManager } from '@INFRA/DB';
import { IUserRepository, UserSchema } from '@INTERFACE/user';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@PRISMA';
import { UserMapper } from '@USER/domain';
import { asyncUnary, map } from '@UTIL';
import { pipe } from 'rxjs';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly manager: DBManager) {}

  private get User() {
    return this.manager.getClient().user;
  }

  create(data: IUserRepository.CreateData): Promise<UserSchema.Aggregate> {
    const create_user = (data: Prisma.UserCreateInput) =>
      this.User.create({ data });

    const transform_to_aggregate = UserMapper.toAggregateAsync;

    return pipe(
      create_user,

      transform_to_aggregate,
    )(data);
  }

  findOne(
    id: string,
    include_deleted = false,
  ): Promise<UserSchema.Aggregate | null> {
    const find_user = (where: Prisma.UserWhereInput) =>
      this.User.findFirst({ where });

    const transform_to_aggregate_if_user_exists = asyncUnary(
      map(UserMapper.toAggregate),
    );

    return pipe(
      find_user,

      transform_to_aggregate_if_user_exists,
    )({ id, ...(include_deleted ? {} : { is_deleted: false }) });
  }

  async findOneByOauth(
    filter: IUserRepository.FindOneByOauthFilter,
  ): Promise<UserSchema.Aggregate | null> {
    const { sub, oauth_type, email } = filter;
    const find_user = (where: Prisma.UserWhereInput) =>
      this.User.findFirst({ where });

    const transform_to_aggregate_if_user_exists = asyncUnary(
      map(UserMapper.toAggregate),
    );

    return pipe(
      find_user,

      transform_to_aggregate_if_user_exists,
    )({ OR: [{ email }, { sub, oauth_type }] });
  }

  async update(id: string, data: IUserRepository.UpdateData): Promise<void> {
    await this.User.updateMany({ where: { id }, data });
    return;
  }

  async save(aggregate: UserSchema.Aggregate): Promise<UserSchema.Aggregate> {
    const { id, email, username, address, phone, is_deleted } = aggregate;
    const data = { email, username, address, phone, is_deleted };
    await this.User.updateMany({ where: { id }, data });
    return aggregate;
  }

  remove(id: string): Promise<void> {
    return this.update(id, { is_deleted: true });
  }
}
