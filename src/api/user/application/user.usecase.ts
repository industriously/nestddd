import { Inject, Injectable } from '@nestjs/common';
import { HttpExceptionFactory } from '@COMMON/exception';
import { IUserRepository, IUserUsecase, UserSchema } from '@INTERFACE/user';
import { ITokenService } from '@INTERFACE/token';
import { UserMapper } from '@USER/domain';
import { UserRepositoryToken } from '@USER/_constants_';
import { Nullish, pipeAsync } from '@UTIL';
import { TokenServiceToken } from '@TOKEN';

@Injectable()
export class UserUsecase implements IUserUsecase {
  constructor(
    @Inject(TokenServiceToken)
    private readonly tokenService: ITokenService,
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  private get_id_from_token = (token: string) =>
    this.tokenService.getAccessTokenPayload(token).id;

  private find_user = (id: string) => this.userRepository.findOne(id, false);

  private throw_if_user_not_found = (
    aggregate: UserSchema.Aggregate | Nullish.Nullish,
  ): UserSchema.Aggregate =>
    Nullish.throwIf(HttpExceptionFactory('NotFound'))(aggregate);

  getPublic(id: string): Promise<UserSchema.Public> {
    const transform_to_public = UserMapper.toPublic;

    return pipeAsync(
      this.find_user,

      this.throw_if_user_not_found,

      transform_to_public,
    )(id);
  }

  getDetail(token: string): Promise<UserSchema.Detail> {
    const transform_to_detail = UserMapper.toDetail;

    return pipeAsync(
      this.get_id_from_token,

      this.find_user,

      this.throw_if_user_not_found,

      transform_to_detail,
    )(token);
  }

  update(token: string, data: IUserUsecase.UpdateData): Promise<void> {
    const update_user = (id: string) => this.userRepository.update(id, data);

    return pipeAsync(
      this.get_id_from_token,

      update_user,
    )(token);
  }

  remove(token: string): Promise<void> {
    const delete_user = (id: string) => this.userRepository.remove(id);

    return pipeAsync(
      this.get_id_from_token,

      delete_user,
    )(token);
  }
}
