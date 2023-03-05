import { IEnv } from '@INTERFACE/common';
import { ConfigService } from '@nestjs/config';

export const config: ConfigService<IEnv, true> = {
  get(key: keyof IEnv): string {
    switch (key) {
      case 'ACCESS_TOKEN_PRIVATE_KEY':
      case 'REFRESH_TOKEN_PRIVATE_KEY':
        return process.env.ACCESS_TOKEN_PRIVATE_KEY;
      case 'ACCESS_TOKEN_PUBLIC_KEY':
      case 'REFRESH_TOKEN_PUBLIC_KEY':
        return process.env.ACCESS_TOKEN_PUBLIC_KEY;
      case 'PORT':
        return '3000';
    }
    return 'test_env';
  },
} as any;
