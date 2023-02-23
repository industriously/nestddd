import { AuthGuard } from '@devts/nestjs-auth';
import { GoogleStrategyToken } from '../constants';

export const GoogleGuard = AuthGuard(GoogleStrategyToken);
