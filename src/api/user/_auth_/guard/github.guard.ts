import { AuthGuard } from '@devts/nestjs-auth';
import { GithubStrategyToken } from '../token';

export const GithubGuard = AuthGuard(GithubStrategyToken);
