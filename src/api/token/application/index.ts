import { Provider } from '@nestjs/common';

import { TokenUsecaseToken, TokenServiceToken } from './constants';
import { TokenService } from './token.service';

export const TokenServiceProvider: Provider<TokenService> = {
  provide: TokenServiceToken,
  useClass: TokenService,
};

export { TokenUsecaseToken, TokenServiceToken };
