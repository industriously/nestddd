import { AuthException, Google } from '@devts/nestjs-auth';
import { IEnv } from '@INTERFACE/common';
import { UserSchema } from '@INTERFACE/user';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAUTH_PROFILE } from '@USER/_constants_';
import typia from 'typia';

@Injectable()
export class GoogleStrategy extends Google.AbstractStrategy<
  typeof OAUTH_PROFILE,
  'email' | 'profile',
  UserSchema.OauthProfile
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

  transform(
    identity: Google.IdToken<'email' | 'profile'>,
  ): UserSchema.OauthProfile {
    const { name: username, email, sub } = identity;
    return { username, email, sub, oauth_type: 'google' };
  }
}
