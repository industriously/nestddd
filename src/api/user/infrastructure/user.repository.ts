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

  update(
    id: string,
    data: IUserRepository.UpdateData,
  ): Promise<UserSchema.Aggregate> {
    return pipe(
      // RecordNotFound Exception is thrown if record does not exist.
      this.User.update<Omit<Prisma.UserUpdateArgs, 'select'>>,

      UserMapper.toAggregateAsync,
    )({ where: { id }, data });
  }

  async findOneByOauth(
    filter: IUserRepository.FindOneByOauthFilter,
  ): Promise<UserSchema.Aggregate | null> {
    const { sub, oauth_type, email } = filter;
    const user = await this.User.findFirst({
      where: { OR: [{ email }, { sub, oauth_type }] },
    });
    return user ? UserMapper.toAggregate(user) : null;
  }

  async findOne(
    id: string,
    include_deleted = false,
  ): Promise<UserSchema.Aggregate | null> {
    const user = await this.User.findFirst({
      where: { id, ...(include_deleted ? {} : { is_deleted: false }) },
    });
    return user ? UserMapper.toAggregate(user) : null;
  }

  async remove(id: string): Promise<void> {
    // RecordNotFound Exception is thrown if record does not exist.
    await this.User.delete({ where: { id } });
    return;
  }
}
