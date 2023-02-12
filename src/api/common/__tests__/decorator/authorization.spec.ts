import { Authorization } from '@COMMON/decorator/http';
import { ExceptionResponse } from '@INTERFACE/common';
import {
  Controller,
  Get,
  HttpStatus,
  INestApplication,
  UseFilters,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { HttpExceptionFilter } from 'src/infrastructure/filter/http-exception.filter';
import supertest from 'supertest';

describe('Authorization doecorator Test', () => {
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

  it('authorization header is required', () => {
    const response: ExceptionResponse = {
      statusCode: HttpStatus.FORBIDDEN,
      message: 'Authorization header is required.',
    };
    return supertest(app.getHttpServer())
      .get('/basic')
      .expect(HttpStatus.FORBIDDEN)
      .expect(response);
  });

  it.each([
    { type: 'basic', header: 'bearer token' },
    { type: 'basic', header: '_basic token' },
    { type: 'basic', header: 'basic_ token' },
    { type: 'basic', header: 'basic_token' },
    { type: 'bearer', header: 'basic token' },
    { type: 'bearer', header: '_bearer token' },
    { type: 'bearer', header: 'bearer_ token' },
    { type: 'bearer', header: 'baerer token' },
  ])('invalid format', ({ type, header }) => {
    const response: ExceptionResponse = {
      statusCode: HttpStatus.FORBIDDEN,
      message: `${type} token is invalid.`,
    };
    return supertest(app.getHttpServer())
      .get(`/${type}`)
      .set('Authorization', header)
      .expect(HttpStatus.FORBIDDEN)
      .expect(response);
  });

  it.each([
    { type: 'basic', header: ' basic token ' },
    { type: 'basic', header: 'BasIc token senon' },
    { type: 'basic', header: 'basic token' },
  ])('get token successfully', ({ type, header }) => {
    return supertest(app.getHttpServer())
      .get(`/${type}`)
      .set('Authorization', header)
      .expect(200)
      .expect({ [type]: 'token' });
  });
});

@Controller()
@UseFilters(HttpExceptionFilter)
class TestController {
  @Get('bearer')
  test1(@Authorization('bearer') bearer: string) {
    return { bearer };
  }
  @Get('basic')
  test2(@Authorization('basic') basic: string) {
    return { basic };
  }
}