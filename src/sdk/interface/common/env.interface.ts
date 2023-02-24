export interface IEnv {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_OAUTH_CALLBACK: string;

  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_OAUTH_CALLBACK: string;

  ACCESS_TOKEN_PRIVATE_KEY: string;
  ACCESS_TOKEN_PUBLIC_KEY: string;
  REFRESH_TOKEN_PRIVATE_KEY: string;
  REFRESH_TOKEN_PUBLIC_KEY: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IEnv {
      [key: string]: string | undefined;
    }
  }
}
