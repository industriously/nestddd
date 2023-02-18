import { Injectable } from '@nestjs/common';
import { IUserRepository, IUserUsecase, UserSchema } from '@INTERFACE/user';
import { pipe } from 'rxjs';
import { HttpExceptionFactory } from '@COMMON/exception';
import { UserMapper } from '@USER/domain';
import { asyncUnary, Nullish } from '@UTIL';

@Injectable()
export class UserUsecase implements IUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  getPublic(id: string): Promise<UserSchema.Public> {
    return pipe(
      this.userRepository.findOne,

      asyncUnary(Nullish.throwIf(HttpExceptionFactory('NotFound'))),

      UserMapper.toPublicAsync,
    )(id);
  }

  getDetail(token: string): Promise<UserSchema.Detail> {
    return pipe(
      (token: string) => token,

      this.userRepository.findOne,

      asyncUnary(Nullish.throwIf(HttpExceptionFactory('NotFound'))),

      UserMapper.toDetailAsync,
    )(token);
  }

  update(token: string, data: IUserUsecase.UpdateData): Promise<void> {
    return pipe(
      (token: string) => token,

      (id) => this.userRepository.update(id, data),
    )(token);
  }

  remove(token: string): Promise<void> {
    return pipe(
      (token: string) => token,

      this.userRepository.remove,
    )(token);
  }
}
