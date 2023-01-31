import { Provider } from '@nestjs/common';
import { TokenUsecase } from './token.usecase';
import { TokenUsecaseToken, TokenServiceToken } from './constant';
import { TokenService } from './token.service';

export const TokenUsecaseProvider: Provider<TokenUsecase> = {
  provide: TokenUsecaseToken,
  useClass: TokenUsecase,
};

export const TokenServiceProvider: Provider<TokenService> = {
  provide: TokenServiceToken,
  useClass: TokenService,
};

export { TokenUsecaseToken, TokenServiceToken };
