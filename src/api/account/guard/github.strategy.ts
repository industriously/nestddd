import type { IEnv, IProfile } from '@INTERFACE/common';
import { PROFILEKEY } from '@COMMON/constant';
import { AuthException, Github } from '@devts/nestjs-auth';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import typia from 'typia';

@Injectable()
export class GithubStrategy extends Github.AbstractStrategy<
  PROFILEKEY,
  IProfile
> {
  constructor(config: ConfigService<IEnv, true>) {
    super({
      key: 'profile',
      client_id: config.get('GITHUB_CLIENT_ID'),
      client_secret: config.get('GITHUB_CLIENT_SECRET'),
      redirect_uri: config.get('GITHUB_OAUTH_CALLBACK'),
      scope: ['read:user', 'user:email'],
    });
  }

  validate(identity: Github.User): boolean {
    if (!typia.is<Github.User & { email: string }>(identity)) {
      throw new AuthException(400, '사용자 정보가 충분하지 않습니다.');
    }
    return true;
  }

  transform(identity: Github.User & { email: string }): IProfile {
    const { login: username, email, id } = identity;
    return { username, email, sub: id + '', oauth_type: 'github' };
  }
}