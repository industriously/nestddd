import { FxUtil } from '@COMMON/util';
import { IUserService, IUserUsecase, UserDomain } from '@INTERFACE/user';
import { Injectable } from '@nestjs/common';
import { pipe } from 'rxjs';
import { UserMapper } from '../domain';

@Injectable()
export class UserUsercase implements IUserUsecase {
  constructor(private readonly userService: IUserService) {}

  getPublic(id: string): Promise<UserDomain.Public> {
    return pipe(
      this.userService.findOne,

      FxUtil.asyncUnary(UserMapper.toPublic),
    )(id);
  }

  getDetail(token: string): Promise<UserDomain.Detail> {
    return pipe(
      (token: string) => token, // get id function

      this.userService.findOne,

      FxUtil.asyncUnary(UserMapper.toDetail),
    )(token);
  }

  async update(
    token: string,
    data: IUserUsecase.UpdateUserData,
  ): Promise<void> {
    await pipe(
      (token: string) => token, // get id function

      (id) => this.userService.update(id, data),
    )(token);
    return;
  }

  async remove(token: string): Promise<void> {
    await pipe(
      (token: string) => token, // get id function

      this.userService.remove,
    )(token);
    return;
  }
}
