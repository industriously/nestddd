import type { ExceptionResponse } from '@INTERFACE/common';
import { TypedQuery } from '@COMMON/decorator/http';
import { HttpExceptionFactory, HttpExceptionMessage } from '@COMMON/exception';
import { FilterModule } from '../filter/filter.module';
import {
  Controller,
  Get,
  HttpStatus,
  INestApplication,
  UseFilters,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';
import { AuthException } from '@devts/nestjs-auth';
import { TypeGuardError } from 'typia';
import { LoggerServiceToken } from '@LOGGER/service';
import { AllExceptionFilter } from '../filter/all-exception.filter';
import { LoggerModule } from '../logger/logger.module';

describe('Infrastructure Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [LoggerModule, FilterModule],
      controllers: [TestController],
    })
      .overrideProvider(LoggerServiceToken)
      .useValue({ error: jest.fn() })
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('HttpException Filtering', () => {
    const expected: ExceptionResponse = {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Http Exception',
    };
    return supertest(app.getHttpServer())
      .get('/http')
      .expect(HttpStatus.NOT_FOUND)
      .expect(expected);
  });

  it('AuthException Filtering', () => {
    return supertest(app.getHttpServer())
      .get('/auth')
      .expect(HttpStatus.PERMANENT_REDIRECT);
  });

  it.each([
    { expected: 'cat', path: '$input.dog' },
    { expected: 'cat', path: undefined },
  ])('typia Exception Filtering', ({ expected, path }) => {
    const response: ExceptionResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: path
        ? `${path.split('$input.')[1]} should be ${expected}.`
        : `invalid type, expected to be ${expected}`,
    };
    return supertest(app.getHttpServer())
      .get(`/typia?expected=${expected}&${path ? 'path=' + path : ''}`)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(response);
  });

  it('ise', () => {
    const expected: ExceptionResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: HttpExceptionMessage.ISE,
    };
    return supertest(app.getHttpServer())
      .get('/ise')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR)
      .expect(expected);
  });

  it('the Other Error Filtering', () => {
    const expected: ExceptionResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: HttpExceptionMessage.ISE,
    };
    return supertest(app.getHttpServer())
      .get('/unknwon')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR)
      .expect(expected);
  });
});

@Controller()
class TestController {
  @Get('http')
  TestHttpException() {
    throw HttpExceptionFactory('NotFound', 'Http Exception');
  }
  @Get('auth')
  TestAuthException() {
    throw new AuthException(501, 'Auth Exception');
  }

  @Get('typia')
  TestTypeGuardException(
    @TypedQuery('expected', { type: 'string', nullable: false })
    expected: string,
    @TypedQuery('path', { type: 'string', nullable: true }) path?: string,
  ) {
    throw new TypeGuardError({
      path,
      expected,
      value: 'value',
      method: 'method',
      message: 'TypeGuardError message',
    });
  }

  @Get('unknwon')
  TestUnknwonError() {
    throw new Error('ISE Test');
  }

  @Get('ise')
  @UseFilters(AllExceptionFilter)
  TestISE() {
    throw new Error('ISE Test');
  }
}
