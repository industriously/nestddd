export interface IEnv {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;

  SESSION_SECRET: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_OAUTH_CALLBACK: string;

  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_OAUTH_CALLBACK: string;

  ACCESS_TOKEN_PUBLICKEY: string;
  ACCESS_TOKEN_PRIVATEKEY: string;
  ACCESS_TOKEN_EXPIRESIN: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IEnv {
      [key: string]: string | undefined;
    }
  }
}
