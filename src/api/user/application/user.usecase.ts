import { IUserService, IUserUsecase, UserDomain } from '@INTERFACE/user';
import { Inject, Injectable } from '@nestjs/common';
import { pipe } from 'rxjs';
import { UserMapper } from '../domain';
import { UserServiceToken } from './constants';

@Injectable()
export class UserUsecase implements IUserUsecase {
  constructor(
    @Inject(UserServiceToken) private readonly userService: IUserService,
  ) {}

  getPublic(id: string): Promise<UserDomain.Public> {
    return pipe(
      this.userService.findOne,

      UserMapper.toPublicAsync,
    )(id);
  }

  getDetail(token: string): Promise<UserDomain.Detail> {
    return pipe(
      (token: string) => token, // get id function

      this.userService.findOne,

      UserMapper.toDetailAsync,
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
