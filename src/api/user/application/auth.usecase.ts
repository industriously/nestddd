import { Injectable } from '@nestjs/common';
import { IAuthUsecase, IUserRepository, UserSchema } from '@INTERFACE/user';
import { Transaction } from '@COMMON/decorator/lazy';

@Injectable()
export class AuthUsecase implements IAuthUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  @Transaction()
  signIn(profile: UserSchema.OauthProfile): Promise<IAuthUsecase.SignInResult> {
    this.userRepository.findOneByOauth(profile);
    // findOne or Create logic
    throw Error();
  }
}
