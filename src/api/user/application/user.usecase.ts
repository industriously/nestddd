import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository, IUserUsecase, UserSchema } from '@INTERFACE/user';
import { pipe } from 'rxjs';
import { HttpExceptionFactory } from '@COMMON/exception';
import { UserMapper } from '@USER/domain';
import { asyncUnary, Nullish } from '@UTIL';
import { UserRepositoryToken } from '@USER/_constants_';

@Injectable()
export class UserUsecase implements IUserUsecase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  getPublic(id: string): Promise<UserSchema.Public> {
    const find_user = (_id: string) => this.userRepository.findOne(_id);

    const throw_if_user_not_found = asyncUnary(
      Nullish.throwIf(HttpExceptionFactory('NotFound')),
    );

    const transform_to_public = UserMapper.toPublicAsync;

    return pipe(
      find_user,

      throw_if_user_not_found,

      transform_to_public,
    )(id);
  }

  getDetail(token: string): Promise<UserSchema.Detail> {
    const get_id_from_token = (token: string): string => token;

    const find_user = (id: string) => this.userRepository.findOne(id);

    const throw_if_user_not_found = asyncUnary<
      UserSchema.Aggregate | null,
      UserSchema.Aggregate
    >(Nullish.throwIf(HttpExceptionFactory('NotFound')));

    const transform_to_detail = UserMapper.toDetailAsync;

    return pipe(
      get_id_from_token,

      find_user,

      throw_if_user_not_found,

      transform_to_detail,
    )(token);
  }

  update(token: string, data: IUserUsecase.UpdateData): Promise<void> {
    const get_id_from_token = (token: string): string => token;

    const update_user = (id: string) => this.userRepository.update(id, data);

    return pipe(
      get_id_from_token,

      update_user,
    )(token);
  }

  remove(token: string): Promise<void> {
    const get_id_from_token = (token: string): string => token;

    const delete_user = (id: string) => this.userRepository.remove(id);

    return pipe(
      get_id_from_token,

      delete_user,
    )(token);
  }
}
