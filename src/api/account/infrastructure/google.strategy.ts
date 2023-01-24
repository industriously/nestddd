import { HttpExceptionMessage } from '@COMMON/exception';
import { Google, StrategyException } from '@devts/nestjs-auth';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import typia from 'typia';

export const GOOGLEOAUTH = Symbol('GoogleStrategy');

@Injectable()
export class GoogleStrategy extends Google.AbstractStrategy<
  'oauth',
  'email' | 'profile',
  { username: string; email: string }
> {
  constructor(configService: ConfigService<IEnv, true>) {
    super({
      key: 'oauth',
      client_id: configService.get('GOOGLE_CLIENT_ID'),
      client_secret: configService.get('GOOGLE_CLIENT_SECRET'),
      redirect_uri: configService.get('GOOGLE_OAUTH_CALLBACK'),
      access_type: 'offline',
      prompt: 'select_account',
      scope: ['email', 'profile'],
    });
  }
  protected throw({ statusCode, message }: StrategyException): never {
    throw new HttpException(
      message ?? HttpExceptionMessage.UAE,
      statusCode ?? HttpStatus.UNAUTHORIZED,
    );
  }
  validate(
    identity: Google.IdToken<'email' | 'profile'>,
    credentials: Google.Credentials,
  ): boolean {
    console.log(identity);
    typia.assert(identity);
    return true;
  }
  transform(identity: Google.IdToken<'email' | 'profile'>): {
    username: string;
    email: string;
  } {
    const { name, email } = identity;
    return { username: name, email };
  }
}
