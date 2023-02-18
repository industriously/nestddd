import { AuthGuard } from '@devts/nestjs-auth';
import { GoogleStrategyToken } from '../token';

export const GoogleGuard = AuthGuard(GoogleStrategyToken);
