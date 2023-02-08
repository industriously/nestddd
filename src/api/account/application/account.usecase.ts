import { AccountToken } from '@ACCOUNT/constant';
import { AuthException } from '@devts/nestjs-auth';
import { Service, Usecase } from '@INTERFACE/account';
import { IProfile } from '@INTERFACE/common';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AccountUsecase implements Usecase {
  constructor(
    @Inject(AccountToken.Service) private readonly accountService: Service,
  ) {}

  async signIn(profile: IProfile): Promise<Usecase.SignInResponse> {
    try {
      const { id } = await this.accountService.findOneOrCreate(profile);
      return { id };
    } catch (error) {
      throw new AuthException(401, '회원 인증에 실패했습니다.');
    }
  }
}
