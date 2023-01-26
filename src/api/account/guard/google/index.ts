import { AuthGuard } from '@devts/nestjs-auth';
import { GoogleStrategy as useClass } from './google.strategy';
import type { Provider } from '@nestjs/common';

const provide = Symbol('GoogleStrategy');

export const GoogleGuard = AuthGuard(provide);

export const GoogleProvider: Provider<useClass> = { provide, useClass };
