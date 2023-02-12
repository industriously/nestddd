import { AccountToken } from '@ACCOUNT/constant';
import { GithubProvider, GoogleProvider } from '@ACCOUNT/guard';
import { Usecase } from '@INTERFACE/account';
import { IEnv } from '@INTERFACE/common';
import { Global, HttpStatus, INestApplication, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import supertest from 'supertest';
import { SignInController } from '../sign-in.controller';

describe('SignInController', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        GoogleProvider,
        GithubProvider,
        { provide: AccountToken.Usecase, useValue: mockDeep<Usecase>() },
      ],
      controllers: [SignInController],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('sign in by google', () => {
    return supertest(app.getHttpServer())
      .get('/sign-in/google')
      .expect(HttpStatus.PERMANENT_REDIRECT);
  });

  it('sign in by github', () => {
    return supertest(app.getHttpServer())
      .get('/sign-in/github')
      .expect(HttpStatus.PERMANENT_REDIRECT);
  });

  it('', () => {
    const controller = new SignInController();
    controller.signInByGithub();
    controller.signInByGoogle();
  });
});

const config: IEnv = {
  NODE_ENV: 'development',
  PORT: '',
  SESSION_SECRET: '',
  GOOGLE_CLIENT_ID: '',
  GOOGLE_CLIENT_SECRET: '',
  GOOGLE_OAUTH_CALLBACK: 'http://example.com',
  GITHUB_CLIENT_ID: '',
  GITHUB_CLIENT_SECRET: '',
  GITHUB_OAUTH_CALLBACK: 'http://example.com',
  TOKEN_PUBLICKEY: '',
  TOKEN_PRIVATEKEY: '',
};

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: { get: (key: keyof IEnv) => config[key] },
    },
  ],
  exports: [ConfigService],
})
class ConfigModule {}
