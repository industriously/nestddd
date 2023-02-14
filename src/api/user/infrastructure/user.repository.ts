import { FxUtil } from '@COMMON/util';
import { DBManager } from '@INFRA/DB';
import { IUserRepository, UserSchema } from '@INTERFACE/user';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@PRISMA';
import { UserMapper } from '@USER/domain';
import { pipe } from 'rxjs';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly manager: DBManager) {}

  private get User() {
    return this.manager.getClient().user;
  }

  create(data: IUserRepository.CreateData): Promise<UserSchema.Aggregate> {
    return pipe(
      this.User.create<Omit<Prisma.UserCreateArgs, 'select'>>,

      UserMapper.toAggregateAsync,
    )({ data });
  }

  findOne(
    id: string,
    include_deleted = false,
  ): Promise<UserSchema.Aggregate | null> {
    return pipe(
      this.User.findFirst,

      FxUtil.asyncUnary(FxUtil.map(UserMapper.toAggregate)),
    )({ where: { id, ...(include_deleted ? {} : { is_deleted: false }) } });
  }

  async findOneByOauth(
    filter: IUserRepository.FindOneByOauthFilter,
  ): Promise<UserSchema.Aggregate | null> {
    const { sub, oauth_type, email } = filter;
    return pipe(
      this.User.findFirst,

      FxUtil.asyncUnary(FxUtil.map(UserMapper.toAggregate)),
    )({ where: { OR: [{ email }, { sub, oauth_type }] } });
  }

  async update(id: string, data: IUserRepository.UpdateData): Promise<void> {
    await this.User.updateMany({ where: { id }, data });
    return;
  }

  remove(id: string): Promise<void> {
    return this.update(id, { is_deleted: true });
  }
}
