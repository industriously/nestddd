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

@Injectable()
export class AuthUsecase implements IAuthUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userService: IUserService,
  ) {}

  @Transaction()
  async signIn(
    profile: UserSchema.OauthProfile,
  ): Promise<IAuthUsecase.SignInResult> {
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
