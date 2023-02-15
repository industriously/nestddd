import { Injectable } from '@nestjs/common';
import {
  IAuthUsecase,
  IUserRepository,
  IUserService,
  UserSchema,
} from '@INTERFACE/user';
import { Transaction } from '@COMMON/decorator/lazy';
import { FxUtil } from '@COMMON/util';
import { pipe } from 'rxjs';

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

      FxUtil.asyncUnary((exist) =>
        exist
          ? this.userService.activate(exist)
          : this.userRepository.create(profile),
      ),

      FxUtil.asyncUnary(({ id }) => ({ id })),
    )(profile);
  }
}
