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
import { TypeGuardError } from 'typia';
import { AllExceptionFilter } from '../filter/all-exception.filter';
import { LoggerModule } from '../logger/logger.module';
import { LoggerServiceToken } from '@INFRA/logger';

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

  it.each([
    { expected: 'cat', path: '$input.dog' },
    { expected: 'cat', path: undefined },
  ])('typia Exception Filtering', ({ expected, path }) => {
    const response: ExceptionResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: path
        ? `${path.split('$input.')[1]} type is invalid.`
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

  @Get('typia')
  TestTypeGuardException(
    @TypedQuery('expected', { optional: false }) expected: string,
    @TypedQuery('path', { optional: true }) path?: string,
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
