import { assignMetadata, ExecutionContext } from '@nestjs/common';
import { Nullish } from '@UTIL';
import type { Request } from 'express';
import { HttpExceptionFactory } from '@COMMON/exception';
import {
  CUSTOM_ROUTE_ARGS_METADATA,
  ROUTE_ARGS_METADATA,
} from '@nestjs/common/constants';

type QueryType = 'boolean' | 'number' | 'string' | 'uuid';

interface TypedQueryOptions {
  /**
   * QueryType : 'boolean' | 'number' | 'string' | 'uuid'
   */
  type?: QueryType;
  /**
   * If multiple is true, query value is array. default is false.
   */
  array?: boolean;
  /**
   * If nullable is true, query value can null or undefined, default is false.
   */
  optional?: boolean;
}

const UUID_PATTERN =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

const isString = (input: unknown): input is string => {
  return typeof input === 'string';
};

const isStringArray = (input: unknown): input is string[] =>
  Array.isArray(input) && input.every(isString);

const castTo = (err: unknown) => ({
  boolean(val: string): boolean {
    switch (val.toLowerCase()) {
      case 'true':
      case '1':
        return true;
      case 'false':
      case '0':
        return false;
      default:
        throw err;
    }
  },
  number(val: string): number {
    const num = Number(val);
    if (isNaN(num) || val == '') {
      throw err;
    }
    return num;
  },
  uuid(val: string): string {
    if (!UUID_PATTERN.test(val)) {
      throw err;
    }
    return val;
  },
  string(val: string): string {
    return val;
  },
});

export const query_typecast = (
  key: string,
  context: ExecutionContext,
  options?: TypedQueryOptions,
) => {
  const { type = 'string', array = false, optional = false } = options ?? {};
  const value = context.switchToHttp().getRequest<Request>().query[key];

  if (!isString(value) && !isStringArray(value) && Nullish.isNot(value)) {
    throw HttpExceptionFactory('BadRequest', `invalid value of query ${key}`);
  }

  const type_cast: (val: string) => boolean | number | string = castTo(
    HttpExceptionFactory(
      'BadRequest',
      `Value of the URL query '${key}' is not a ${type}.`,
    ),
  )[type];

  if (Nullish.is(value)) {
    if (!optional) {
      throw HttpExceptionFactory(
        'BadRequest',
        `Value of the URL query '${key}' is required.`,
      );
    }
    return undefined; // 사용될 때, null이 아니라 optional값으로 사용 따라서 undefined
  }

  if (Array.isArray(value)) {
    if (!array) {
      throw HttpExceptionFactory(
        'BadRequest',
        `Value of the URL query '${key}' should be single.`,
      );
    }
    return value.map(type_cast);
  }
  const casted = type_cast(value);
  return array ? [casted] : casted;
};

/**
 * URL parameter decorator with type.
 *
 * `TypedQuery` is a decorator function getting specific typed query from the HTTP
 * request URL.
 *
 * @param key URL Query name
 * @param options query type option
 *
 * * type - 'boolean' | 'number' | 'string' | 'string' | 'uuid', default is string
 * * multiple - If multiple is true, query value is array type, default is false.
 * * nullale - If nullable is true, query value can be undefined, default is false.
 * @returns Parameter decorator
 *
 * @author jiwon ro - https://github.com/rojiwon0325
 */
export const TypedQuery = (
  key: string,
  options?: TypedQueryOptions,
): ParameterDecorator => {
  return (target, propertyKey, index) => {
    const args =
      Reflect.getMetadata(
        ROUTE_ARGS_METADATA,
        target.constructor,
        propertyKey,
      ) || {};
    Reflect.defineMetadata(
      ROUTE_ARGS_METADATA,
      {
        ...assignMetadata(args, 4, index),
        [`query${CUSTOM_ROUTE_ARGS_METADATA}:${index}`]: {
          index,
          factory: (_: unknown, ctx: ExecutionContext) =>
            query_typecast(key, ctx, options),
        },
      },
      target.constructor,
      propertyKey,
    );
  };
};
