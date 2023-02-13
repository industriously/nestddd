import { PROFILEKEY } from '@COMMON/constants';
import { Profile } from '@COMMON/decorator';
import { IProfile } from '@INTERFACE/common';
import {
  CanActivate,
  Controller,
  ExecutionContext,
  INestApplication,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';

const testProfile: IProfile = {
  sub: '1234',
  oauth_type: 'google',
  email: 'sdfdsf@naver.com',
  username: 'testuser',
};

class TestGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    request[PROFILEKEY] = testProfile;
    return true;
  }
}

describe('Profile doecorator Test', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TestController],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('profile', () => {
    return supertest(app.getHttpServer())
      .get('/profile')
      .expect(200)
      .expect(testProfile);
  });
});

@Controller()
class TestController {
  @Get('profile')
  @UseGuards(TestGuard)
  test1(@Profile() profile: IProfile) {
    return profile;
  }
}
