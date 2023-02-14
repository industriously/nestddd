import { Injectable } from '@nestjs/common';
import { IAuthUsecase, IUserRepository, UserSchema } from '@INTERFACE/user';
import { Transaction } from '@COMMON/decorator/lazy';

@Injectable()
export class AuthUsecase implements IAuthUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  @Transaction()
  async signIn(
    profile: UserSchema.OauthProfile,
  ): Promise<IAuthUsecase.SignInResult> {
    const user = await this.userRepository.findOneByOauth(profile);
    // findOne or Create logic
    throw Error();
  }
}
