import { Provider } from '@nestjs/common';
import { TokenUsecase } from './token.usecase';
import { TokenUsecaseToken } from './constant';

export const TokenUsecaseProvider: Provider<TokenUsecase> = {
  provide: TokenUsecaseToken,
  useClass: TokenUsecase,
};

export { TokenUsecaseToken };
