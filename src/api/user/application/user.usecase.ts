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

      FxUtil.asyncMapper(UserMapper.toPublic),
    )(id);
  }

  getDetail(token: string): Promise<UserDomain.Detail> {
    return pipe(
      (token: string) => token, // get id function

      this.userService.findOne,

      FxUtil.asyncMapper(UserMapper.toDetail),
    )(token);
  }

  update(token: string, data: IUserUsecase.UpdateUserData): Promise<void> {
    return pipe(
      (token: string) => token, // get id function

      async (id: string) => {
        await this.userService.update(id, data);
      },
    )(token);
  }

  remove(token: string): Promise<void> {
    return pipe(
      (token: string) => token, // get id function

      async (id: string) => {
        await this.userService.remove(id);
      },
    )(token);
  }
}
