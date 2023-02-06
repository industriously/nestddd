import { PROFILEKEY } from '@COMMON/constant';
import { Profile } from '@COMMON/decorator';
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

jest.mock('typia', () => ({
  assertEquals: <T>(val: T) => val,
}));

class TestGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    request[PROFILEKEY] = { username: 'testuser' };
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
      .expect({ username: 'testuser' });
  });
});

@Controller()
class TestController {
  @Get('profile')
  @UseGuards(TestGuard)
  test1(@Profile() profile: unknown) {
    return profile;
  }
}
