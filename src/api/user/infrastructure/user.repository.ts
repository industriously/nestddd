import { DBManager } from '@INFRA/DB';
import { IUserRepository, UserDomain } from '@INTERFACE/user';
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
  create(data: IUserRepository.CreateData): Promise<UserDomain.State> {
    return pipe(
      (input: Prisma.UserCreateInput) => this.User.create({ data: input }),
      UserMapper.toStateAsync,
    )(data);
  }
  update(
    id: string,
    data: IUserRepository.UpdateData,
  ): Promise<UserDomain.State> {
    throw Error();
  }
  findOneByEmailOrOauth(
    filter: IUserRepository.findOneByEmailOrOauthFilter,
  ): Promise<UserDomain.State | null> {
    throw Error();
  }
  findOne(
    id: string,
    include_deleted: boolean,
  ): Promise<UserDomain.State | null> {
    throw Error();
  }
  remove(id: string): Promise<void> {
    throw Error();
  }
}
