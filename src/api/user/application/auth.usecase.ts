import { Injectable } from '@nestjs/common';
import { IAuthUsecase, IUserRepository, UserSchema } from '@INTERFACE/user';
import { Transaction } from '@COMMON/decorator/lazy';
import { identity } from 'rxjs';
import { Nullish, pipeAsync } from '@UTIL';
import { Inject } from '@nestjs/common';
import { UserRepositoryToken } from '@USER/_constants_';
import { UserBusiness } from '@USER/domain';
import { ITokenService } from '@INTERFACE/token';
import { TokenServiceToken } from '@TOKEN';
import { HttpExceptionFactory } from '@COMMON/exception';

@Injectable()
export class AuthUsecase implements IAuthUsecase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @Inject(TokenServiceToken)
    private readonly tokenService: ITokenService,
  ) {}

  /**
   * oauth server로 부터 전달받은 사용자 정보를 통해 로그인 토큰 생성
   * @param profile oauth server로 부터 전달받은 신뢰할 수 있는 사용자 정보
   * @returns 위 정보를 기반으로 생성된 토큰을 포함한 객체
   */
  @Transaction()
  async signIn(
    profile: UserSchema.OauthProfile,
  ): Promise<IAuthUsecase.SignInResponse> {
    const find_user = (filter: UserSchema.OauthProfile) =>
      this.userRepository.findOneByOauth(filter);

    const activate_or_create_user = (agg: UserSchema.Aggregate | null) => {
      return Nullish.is(agg)
        ? this.userRepository.create(profile)
        : UserBusiness.isInActive(agg)
        ? this.userRepository.save(UserBusiness.activate(agg))
        : identity(agg);
    };

    const generate_tokens = (
      agg: UserSchema.Aggregate,
    ): IAuthUsecase.SignInResponse => ({
      access_token: this.tokenService.getAccessToken(agg),
      refresh_token: this.tokenService.getRefreshToken(agg),
      id_token: this.tokenService.getIdToken(agg),
    });

    return pipeAsync(
      find_user,

      activate_or_create_user,

      generate_tokens,
    )(profile);
  }

  refresh(token: string): Promise<IAuthUsecase.RefreshResponse> {
    const get_id_from_token = (token: string) =>
      this.tokenService.getAccessTokenPayload(token).id;

    const find_user = (id: string) => this.userRepository.findOne(id);

    const throw_if_user_not_found = (
      aggregate: UserSchema.Aggregate | Nullish.Nullish,
    ): UserSchema.Aggregate =>
      Nullish.throwIf(HttpExceptionFactory('NotFound'))(aggregate);

    const generate_access_token = (
      agg: UserSchema.Aggregate,
    ): IAuthUsecase.RefreshResponse => ({
      access_token: this.tokenService.getAccessToken(agg),
    });

    return pipeAsync(
      get_id_from_token,

      find_user,

      throw_if_user_not_found,

      generate_access_token,
    )(token);
  }
}
