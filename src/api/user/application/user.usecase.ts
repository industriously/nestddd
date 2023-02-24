import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository, IUserUsecase, UserSchema } from '@INTERFACE/user';
import { pipe } from 'rxjs';
import { HttpExceptionFactory } from '@COMMON/exception';
import { UserMapper } from '@USER/domain';
import { asyncUnary, Nullish } from '@UTIL';
import { UserRepositoryToken } from '@USER/_constants_';
import { TokenServiceToken } from '@TOKEN';
import { ITokenService } from '@INTERFACE/token';

@Injectable()
export class UserUsecase implements IUserUsecase {
  constructor(
    @Inject(TokenServiceToken)
    private readonly tokenService: ITokenService,
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  private find_user = (id: string) => this.userRepository.findOne(id, false);

  private get_id_from_token = (token: string) =>
    this.tokenService.getPayload(token).id;

  private throw_if_user_not_found = (
    aggregate: UserSchema.Aggregate | Nullish.Nullish,
  ): UserSchema.Aggregate =>
    Nullish.throwIf(HttpExceptionFactory('NotFound'))(aggregate);

  getPublic(id: string): Promise<UserSchema.Public> {
    const transform_to_public = UserMapper.toPublic;

    return pipe(
      this.find_user,

      asyncUnary(this.throw_if_user_not_found),

      asyncUnary(transform_to_public),
    )(id);
  }

  getDetail(token: string): Promise<UserSchema.Detail> {
    const transform_to_detail = UserMapper.toDetail;

    return pipe(
      this.get_id_from_token,

      this.find_user,

      asyncUnary(this.throw_if_user_not_found),

      asyncUnary(transform_to_detail),
    )(token);
  }

  update(token: string, data: IUserUsecase.UpdateData): Promise<void> {
    const update_user = (id: string) => this.userRepository.update(id, data);

    return pipe(
      this.get_id_from_token,

      update_user,
    )(token);
  }

  remove(token: string): Promise<void> {
    const delete_user = (id: string) => this.userRepository.remove(id);

    return pipe(
      this.get_id_from_token,

      delete_user,
    )(token);
  }
}
