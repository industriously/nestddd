import { AuthGuard } from '@devts/nestjs-auth';
import { Provider } from '@nestjs/common';
import { GithubStrategy } from './github.strategy';
import { GoogleStrategy } from './google.strategy';

const github = Symbol('GithubStrategy');
const google = Symbol('GoogleStrategy');

export const GithubGuard = AuthGuard(github);
export const GoogleGuard = AuthGuard(google);

export const GithubProvider: Provider<GithubStrategy> = {
  provide: github,
  useClass: GithubStrategy,
};
export const GoogleProvider: Provider<GoogleStrategy> = {
  provide: google,
  useClass: GoogleStrategy,
};
