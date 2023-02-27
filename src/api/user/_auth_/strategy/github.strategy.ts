import { OAUTH_PROFILE } from '@USER/_constants_';
import { Github, Request, StrategyException } from '@devts/nestjs-auth';
import { UserSchema } from '@INTERFACE/user';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import typia from 'typia';
import { IEnv } from '@INTERFACE/common';
import { HttpExceptionFactory } from '@COMMON/exception';

@Injectable()
export class GithubStrategy extends Github.AbstractStrategy<
  typeof OAUTH_PROFILE,
  UserSchema.OauthProfile
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

  protected override throw({
    message = '사용자 인증에 실패했습니다.',
  }: StrategyException): never {
    throw HttpExceptionFactory('UnAuthorized', message);
  }

  override getCode(request: Request): string {
    const code = (request.body as any).code;
    if (typeof code !== 'string') {
      this.throw({ message: 'code not found' });
    }
    return code;
  }

  validate(identity: Github.User): boolean {
    if (!typia.is<Github.User & { email: string }>(identity)) {
      this.throw({ message: '사용자 정보가 충분하지 않습니다.' });
    }
    return true;
  }

  transform(
    identity: Github.User & { email: string },
  ): UserSchema.OauthProfile {
    const { login: username, email, id } = identity;
    return {
      username,
      email,
      sub: id + '',
      oauth_type: 'github',
    } satisfies UserSchema.OauthProfile;
  }
}
