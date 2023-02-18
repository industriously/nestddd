import { Injectable } from '@nestjs/common';
import {
  IAuthUsecase,
  IUserRepository,
  IUserService,
  UserSchema,
} from '@INTERFACE/user';
import { Transaction } from '@COMMON/decorator/lazy';
import { pipe } from 'rxjs';
import { asyncUnary, edge, Nullish } from '@UTIL';
import { Inject } from '@nestjs/common';
import { UserRepositoryToken, UserServiceToken } from '@USER/_constants_';

@Injectable()
export class AuthUsecase implements IAuthUsecase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @Inject(UserServiceToken)
    private readonly userService: IUserService,
  ) {}

  /**
   * oauth server로 부터 전달받은 사용자 정보를 통해 로그인 토큰 생성
   * @param profile oauth server로 부터 전달받은 신뢰할 수 있는 사용자 정보
   * @returns 위 정보를 기반으로 생성된 토큰을 포함한 객체
   */
  @Transaction()
  signIn(
    profile: UserSchema.OauthProfile,
  ): Promise<IAuthUsecase.SignInResponse> {
    return pipe(
      this.userRepository.findOneByOauth,

      asyncUnary(
        edge(
          Nullish.isNot,

          this.userService.activate,

          () => this.userRepository.create(profile),
        ),
      ),

      asyncUnary(({ id }) => ({ id })),
    )(profile);
  }
}
