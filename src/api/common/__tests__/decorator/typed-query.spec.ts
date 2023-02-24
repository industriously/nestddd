import { TypedQuery } from '@COMMON/decorator/http';
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

describe('TypedQuery decorator Test', () => {
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

  describe('nullable', () => {
    it('no query', () => {
      return supertest(app.getHttpServer())
        .get('/null')
        .expect(HttpStatus.OK)
        .expect('success');
    });

    it('single query', () => {
      return supertest(app.getHttpServer())
        .get('/null?query=test')
        .expect(HttpStatus.OK)
        .expect('fail');
    });
  });

  describe('default option', () => {
    it('no query', () => {
      const response: ExceptionResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Value of the URL query 'query' is required.",
      };
      return supertest(app.getHttpServer())
        .get('/nooption')
        .expect(HttpStatus.BAD_REQUEST)
        .expect(response);
    });

    it('single query', () => {
      return supertest(app.getHttpServer())
        .get('/nooption?query=testvalue')
        .expect(HttpStatus.OK)
        .expect('testvalue');
    });

    it('multiple query', () => {
      const response: ExceptionResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Value of the URL query 'query' is not a single.",
      };
      return supertest(app.getHttpServer())
        .get('/nooption?query=testvalue1&query=testvalue2')
        .expect(HttpStatus.BAD_REQUEST)
        .expect(response);
    });
  });

  describe('type', () => {
    it.each(['test', '1234', 'true', '0'])('string success', (query) => {
      return supertest(app.getHttpServer())
        .get(`/string?query=${query}`)
        .expect(HttpStatus.OK)
        .expect(query);
    });

    describe('number', () => {
      it.each(['1234', '0x3E8', '00', '1', '0.123'])('success', (query) => {
        return supertest(app.getHttpServer())
          .get(`/number?query=${query}`)
          .expect(HttpStatus.OK)
          .expect((res) => typeof res === 'number');
      });

      it.each(['false', 'a', ''])('fail', (query) => {
        const response: ExceptionResponse = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Value of the URL query 'query' is not a number.",
        };
        return supertest(app.getHttpServer())
          .get(`/number?query=${query}`)
          .expect(HttpStatus.BAD_REQUEST)
          .expect(response);
      });
    });

    describe('boolean', () => {
      it.each(['true', 'false', '0', '1', 'True', 'False'])(
        'success',
        (query) => {
          return supertest(app.getHttpServer())
            .get(`/boolean?query=${query}`)
            .expect(HttpStatus.OK)
            .expect((res) => typeof res === 'boolean');
        },
      );

      it.each(['2345', '-1', 'TRUE', 'FALSE', ''])('fail', (query) => {
        const response: ExceptionResponse = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Value of the URL query 'query' is not a boolean.",
        };
        return supertest(app.getHttpServer())
          .get(`/boolean?query=${query}`)
          .expect(HttpStatus.BAD_REQUEST)
          .expect(response);
      });
    });

    describe('uuid', () => {
      it.each([
        '3e3a13e0-a57c-11ed-afa1-0242ac120002',
        '456435b0-a57c-11ed-afa1-0242ac120002',
        '7ac1b28a-af67-4094-a458-a23022199a69',
      ])('success', (query) => {
        return supertest(app.getHttpServer())
          .get(`/uuid?query=${query}`)
          .expect(HttpStatus.OK)
          .expect(query);
      });

      it('fail', () => {
        const response: ExceptionResponse = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Value of the URL query 'query' is not a uuid.",
        };
        return supertest(app.getHttpServer())
          .get(`/uuid?query=string`)
          .expect(HttpStatus.BAD_REQUEST)
          .expect(response);
      });
    });
  });

  describe('multiple', () => {
    it('fail', () => {
      const response: ExceptionResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Value of the URL query 'query' is not a number.",
      };
      return supertest(app.getHttpServer())
        .get('/multiple/number?query=1234&query=test')
        .expect(HttpStatus.BAD_REQUEST)
        .expect(response);
    });

    it('string', () => {
      return supertest(app.getHttpServer())
        .get('/multiple/string?query=test')
        .expect(HttpStatus.OK)
        .expect('string');
    });

    it('number', () => {
      return supertest(app.getHttpServer())
        .get('/multiple/number?query=123')
        .expect(HttpStatus.OK)
        .expect('number');
    });

    it('boolean', () => {
      return supertest(app.getHttpServer())
        .get('/multiple/boolean?query=true')
        .expect(HttpStatus.OK)
        .expect('boolean');
    });

    it('uuid', () => {
      return supertest(app.getHttpServer())
        .get('/multiple/uuid?query=7ac1b28a-af67-4094-a458-a23022199a69')
        .expect(HttpStatus.OK)
        .expect('string');
    });
  });
});

const key = 'query';

@Controller()
@UseFilters(HttpExceptionFilter)
class TestController {
  @Get('nooption')
  test1(@TypedQuery(key) query: string) {
    return typeof query === 'string' ? query : 'fail';
  }

  @Get('string')
  test2(@TypedQuery(key, { type: 'string' }) query: string) {
    return typeof query === 'string' ? query : 'fail';
  }

  @Get('number')
  test3(@TypedQuery(key, { type: 'number' }) query: number) {
    return typeof query === 'number' ? query : 'fail';
  }

  @Get('boolean')
  test4(@TypedQuery(key, { type: 'boolean' }) query: boolean) {
    return typeof query === 'boolean' ? query : 'fail';
  }

  @Get('uuid')
  test5(@TypedQuery(key, { type: 'uuid' }) query: string) {
    return typeof query === 'string' ? query : 'fail';
  }

  @Get('null')
  test6(@TypedQuery(key, { nullable: true }) query?: string) {
    return typeof query === 'undefined' ? 'success' : 'fail';
  }

  @Get('multiple/string')
  test7(
    @TypedQuery(key, { type: 'string', multiple: true })
    query: string[],
  ) {
    return Array.isArray(query) ? typeof query[0] : 'fail';
  }

  @Get('multiple/number')
  test8(
    @TypedQuery(key, { type: 'number', multiple: true })
    query: number[],
  ) {
    return Array.isArray(query) ? typeof query[0] : 'fail';
  }

  @Get('multiple/boolean')
  test9(
    @TypedQuery(key, { type: 'boolean', multiple: true })
    query: boolean[],
  ) {
    return Array.isArray(query) ? typeof query[0] : 'fail';
  }

  @Get('multiple/uuid')
  test10(
    @TypedQuery(key, { type: 'uuid', multiple: true })
    query: string[],
  ) {
    return Array.isArray(query) ? typeof query[0] : 'fail';
  }
}
