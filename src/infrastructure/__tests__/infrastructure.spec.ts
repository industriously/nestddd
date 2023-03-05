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
      controllers: [InfraTestController],
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
    return supertest(app.getHttpServer())
      .get('/http')
      .expect(HttpStatus.NOT_FOUND)
      .expect('Http Exception');
  });

  it.each([
    { expected: 'cat', path: '$input.dog' },
    { expected: 'cat', path: undefined },
  ])('typia Exception Filtering', ({ expected, path }) => {
    return supertest(app.getHttpServer())
      .get(`/typia?expected=${expected}&${path ? 'path=' + path : ''}`)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(
        path
          ? `${path.split('$input.')[1]} type is invalid.`
          : `invalid type, expected to be ${expected}`,
      );
  });

  it('ise', () => {
    return supertest(app.getHttpServer())
      .get('/ise')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR)
      .expect(HttpExceptionMessage.ISE);
  });

  it('the Other Error Filtering', () => {
    return supertest(app.getHttpServer())
      .get('/unknwon')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR)
      .expect(HttpExceptionMessage.ISE);
  });
});

@Controller()
class InfraTestController {
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
