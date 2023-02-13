import type { IEnv, IProfile } from '@INTERFACE/common';
import { PROFILEKEY } from '@COMMON/constants';
import { AuthException, Google } from '@devts/nestjs-auth';
import { Injectable } from '@nestjs/common';
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

  validate(identity: Google.IdToken<'email' | 'profile'>): boolean {
    if (!typia.is(identity)) {
      throw new AuthException(400, '사용자 정보가 충분하지 않습니다.');
    }
    return true;
  }

  transform(identity: Google.IdToken<'email' | 'profile'>): IProfile {
    const { name: username, email, sub } = identity;
    return { username, email, sub, oauth_type: 'google' };
  }
}
