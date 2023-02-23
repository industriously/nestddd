import { AuthGuard } from '@devts/nestjs-auth';
import { GithubStrategyToken } from '../constants';

export const GithubGuard = AuthGuard(GithubStrategyToken);
