/** 
나중에 블로그에 비교 자료로 사용하자. instance를 함수로 짜서 코드가 얼마나 줄었는지!
import { DBClient } from '@INTERFACE/common';
import { IUserRepository, UserSchema } from '@INTERFACE/user';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@PRISMA';
import { UserMapper } from '@USER/domain';
import { map, pipeAsync } from '@UTIL';
import typia from 'typia';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly client: DBClient) {}

  private get User() {
    return this.client.get().user;
  }

  create(data: IUserRepository.CreateData): Promise<UserSchema.Aggregate> {
    const validate_input =
      typia.createAssertPrune<IUserRepository.CreateData>();

    const create_user = (data: Prisma.UserCreateInput) =>
      this.User.create({ data });

    const transform_to_aggregate = UserMapper.toAggregate;

    return pipeAsync(
      validate_input,

      create_user,

      transform_to_aggregate,
    )(data);
  }

  findOne(
    id: string,
    include_deleted = false,
  ): Promise<UserSchema.Aggregate | null> {
    const validate_input = typia.createAssertPrune<{
      id: string;
      is_deleted?: boolean;
    }>();

    const find_user = (where: Prisma.UserWhereInput) =>
      this.User.findFirst({ where });

    const transform_to_aggregate_if_user_exists = map(UserMapper.toAggregate);

    return pipeAsync(
      validate_input,

      find_user,

      transform_to_aggregate_if_user_exists,
    )({ id, ...(include_deleted ? {} : { is_deleted: false }) });
  }

  async findOneByOauth(
    filter: IUserRepository.FindOneByOauthFilter,
  ): Promise<UserSchema.Aggregate | null> {
    const validate_input =
      typia.createAssertPrune<IUserRepository.FindOneByOauthFilter>();

    const transform_to_where_input = ({
      sub,
      oauth_type,
      email,
    }: IUserRepository.FindOneByOauthFilter): Prisma.UserWhereInput => ({
      OR: [{ email }, { sub, oauth_type }],
    });

    const find_user = (where: Prisma.UserWhereInput) =>
      this.User.findFirst({ where });

    const transform_to_aggregate_if_user_exists = map(UserMapper.toAggregate);

    return pipeAsync(
      validate_input,

      transform_to_where_input,

      find_user,

      transform_to_aggregate_if_user_exists,
    )(filter);
  }

  async update(id: string, data: IUserRepository.UpdateData): Promise<void> {
    const _id = typia.assert(id);
    const _data = typia.assertPrune(data);
    await this.User.updateMany({ where: { id: _id }, data: _data });
    return;
  }

  async save(aggregate: UserSchema.Aggregate): Promise<UserSchema.Aggregate> {
    const { id, email, username, address, phone, is_deleted } =
      typia.assertPrune<
        Pick<
          UserSchema.Aggregate,
          'id' | 'email' | 'username' | 'address' | 'phone' | 'is_deleted'
        >
      >(aggregate);

    await this.User.updateMany({
      where: { id },
      data: { email, username, address, phone, is_deleted },
    });
    return aggregate;
  }

  remove(id: string): Promise<void> {
    return this.update(id, { is_deleted: true });
  }
}

*/
