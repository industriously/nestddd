import { Injectable } from '@nestjs/common';
import { IAuthUsecase, IUserRepository, UserSchema } from '@INTERFACE/user';
import { Transaction } from '@COMMON/decorator/lazy';
import { pipe } from 'rxjs';
import { asyncUnary, Nullish } from '@UTIL';
import { Inject } from '@nestjs/common';
import { UserRepositoryToken } from '@USER/_constants_';
import { UserBusiness } from '@USER/domain';

@Injectable()
export class AuthUsecase implements IAuthUsecase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
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

    const activate_or_create_user = asyncUnary(
      (agg: UserSchema.Aggregate | null) => {
        return Nullish.is(agg)
          ? this.userRepository.create(profile)
          : this.userRepository.save(UserBusiness.activate(agg));
      },
    );

    const generate_token = asyncUnary((agg: UserSchema.Aggregate) => ({
      id: agg.id,
    }));

    return pipe(
      find_user,

      activate_or_create_user,

      generate_token,
    )(profile);
  }
}
