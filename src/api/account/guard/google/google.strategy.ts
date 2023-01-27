import { PROFILEKEY } from '@COMMON/constant';
import { HttpExceptionMessage } from '@COMMON/exception';
import { Google, StrategyException } from '@devts/nestjs-auth';
import { IEnv, IProfile } from '@INTERFACE/common';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import typia from 'typia';

@Injectable()
export class GoogleStrategy extends Google.AbstractStrategy<
  PROFILEKEY,
  'email' | 'profile',
  IProfile
> {
  constructor(config: ConfigService<IEnv, true>) {
    super({
      key: 'profile',
      client_id: config.get('GOOGLE_CLIENT_ID'),
      client_secret: config.get('GOOGLE_CLIENT_SECRET'),
      redirect_uri: config.get('GOOGLE_OAUTH_CALLBACK'),
      access_type: 'offline',
      prompt: 'select_account',
      scope: ['email', 'profile'],
    });
  }
  protected override throw({ statusCode, message }: StrategyException): never {
    throw new HttpException(
      message ?? HttpExceptionMessage.UAE,
      statusCode ?? HttpStatus.UNAUTHORIZED,
    );
  }
  validate(identity: Google.IdToken<'email' | 'profile'>): boolean {
    typia.assert(identity);
    return true;
  }
  transform(identity: Google.IdToken<'email' | 'profile'>): IProfile {
    const { name: username, email, sub } = identity;
    return { username, email, sub, oauth_type: 'google' };
  }
}
