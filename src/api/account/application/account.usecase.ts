import { AuthException } from '@devts/nestjs-auth';
import { IAccountService, IAccountUsecase } from '@INTERFACE/account';
import { IProfile } from '@INTERFACE/common';
import { Inject, Injectable } from '@nestjs/common';
import { AccountServiceToken } from './constant';

@Injectable()
export class AccountUsecase implements IAccountUsecase {
  constructor(
    @Inject(AccountServiceToken)
    private readonly accountService: IAccountService,
  ) {}

  async signIn(profile: IProfile): Promise<IAccountUsecase.SignInResponse> {
    try {
      const { id } = await this.accountService.findOneOrCreate(profile);
      return { id };
    } catch (error) {
      throw new AuthException(401, '회원 인증에 실패했습니다.');
    }
  }
}
