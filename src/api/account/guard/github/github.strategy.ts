import { PROFILEKEY } from '@COMMON/constant';
import { HttpExceptionMessage } from '@COMMON/exception';
import { Github, StrategyException } from '@devts/nestjs-auth';
import { IProfile } from '@INTERFACE/common';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
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
  protected throw({ statusCode, message }: StrategyException): never {
    throw new HttpException(
      message ?? HttpExceptionMessage.UAE,
      statusCode ?? HttpStatus.UNAUTHORIZED,
    );
  }
  validate(identity: Github.User): boolean {
    typia.assert<Github.User & { email: string }>(identity);
    return true;
  }
  transform(identity: Github.User & { email: string }): IProfile {
    const { login: username, email, node_id: sub } = identity;
    return { username, email, sub, oauth_type: 'github' };
  }
}
