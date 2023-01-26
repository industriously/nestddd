import { AuthGuard } from '@devts/nestjs-auth';
import { GithubStrategy as useClass } from './github.strategy';
import type { Provider } from '@nestjs/common';

const provide = Symbol('GithubStrategy');

export const GithubGuard = AuthGuard(provide);

export const GithubProvider: Provider<useClass> = { provide, useClass };
