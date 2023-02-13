import { Transaction } from '@COMMON/decorator/lazy';
import { HttpExceptionFactory } from '@COMMON/exception';
import { FxUtil } from '@COMMON/util';
import { IProfile } from '@INTERFACE/common';
import { IUserRepository, IUserService, UserDomain } from '@INTERFACE/user';
import { Injectable } from '@nestjs/common';
import { pipe } from 'rxjs';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  findOne(id: string): Promise<UserDomain.State> {
    return pipe(
      (id: string) => this.userRepository.findOne(id, false),

      FxUtil.asyncUnary(
        FxUtil.throwIfNullish(
          HttpExceptionFactory('NotFound', '사용자를 찾을 수 없습니다.'),
        ),
      ),
    )(id);
  }

  /**
   * 사용자 활성화
   *
   * 사용자가 soft-delete된 상태이면 활성상태로 변경한다.
   * @param alias user id | user state
   * @returns user state
   */
  async activate(alias: string | UserDomain.State): Promise<UserDomain.State> {
    if (typeof alias === 'string') {
      const user = await this.findOne(alias);
      return user.is_deleted
        ? this.userRepository.update(alias, { is_deleted: false })
        : user;
    }
    return alias.is_deleted
      ? this.userRepository.update(alias.id, { is_deleted: false })
      : alias;
  }

  @Transaction()
  async findOneOrCreate(profile: IProfile): Promise<UserDomain.State> {
    const { sub, oauth_type, email, username } = profile;

    const exist = await this.userRepository.findOneByEmailOrOauth({
      sub,
      oauth_type,
      email,
    });

    return exist
      ? this.activate(exist)
      : this.userRepository.create({ sub, oauth_type, email, username });
  }

  update(id: string, data: IUserService.UpdateData): Promise<UserDomain.State> {
    return this.userRepository.update(id, data);
  }

  remove(id: string): Promise<void> {
    return this.userRepository.remove(id);
  }
}
