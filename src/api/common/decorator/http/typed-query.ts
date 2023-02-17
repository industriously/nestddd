import { pipe } from 'rxjs';
import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { List, Nullish } from '@UTIL';
import type { Request } from 'express';

type QueryType = 'boolean' | 'number' | 'string' | 'string' | 'uuid';

interface TypedQueryOptions {
  /**
   * QueryType : 'boolean' | 'number' | 'string' | 'string' | 'uuid'
   */
  type?: QueryType;
  /**
   * If multiple is true, query value is array. default is false.
   */
  multiple?: boolean;
  /**
   * If nullable is true, query value can null or undefined, default is false.
   */
  nullable?: boolean;
}

const UUID_PATTERN =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

export const typeCast = (type: QueryType) => (val: string) => {
  if (type === 'boolean') {
    if (val === 'true' || val === 'True' || val === '1') {
      return true;
    }
    if (val === 'false' || val === 'False' || val === '0') {
      return false;
    }
  }
  if (type === 'number') {
    const num = Number(val);
    if (!isNaN(num) && val !== '') return num;
  }
  if (type === 'uuid' && UUID_PATTERN.test(val)) {
    return val;
  }
  if (type === 'string') {
    return val;
  }
  return null;
};

export const query_typecast = (
  key: string,
  value: string | string[] | undefined,
  options?: TypedQueryOptions,
) => {
  const { type = 'string', multiple = false, nullable = false } = options ?? {};

  const type_cast = typeCast(type);
  const throw_if_null = Nullish.throwIf(
    new BadRequestException(
      `Value of the URL query '${key}' is not a ${type}.`,
    ),
  );

  if (Nullish.is(value)) {
    if (!nullable) {
      throw new BadRequestException(
        `Value of the URL query '${key}' is required.`,
      );
    }
    return undefined; // 사용될 때, null이 아니라 optional값으로 사용 따라서 undefined
  }

  if (Array.isArray(value)) {
    if (!multiple) {
      throw new BadRequestException(
        `Value of the URL query '${key}' is not a single.`,
      );
    }
    return pipe(
      List.map(type_cast),

      List.filter(Nullish.isNot),
    )(value);
  }

  return pipe(
    type_cast,

    throw_if_null,

    (input) => (multiple ? [input] : input),
  )(value);
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
export const TypedQuery = (key: string, options?: TypedQueryOptions) =>
  createParamDecorator((_key: string, ctx: ExecutionContext) => {
    const extract_query = (context: ExecutionContext) =>
      context.switchToHttp().getRequest<
        Request<
          {
            [key: string]: string;
          },
          any,
          any,
          { [key: string]: string | string[] | undefined }
        >
      >().query[_key];

    const type_cast_query = (query: string | string[] | undefined) =>
      query_typecast(_key, query, options);

    return pipe(
      extract_query,

      type_cast_query,
    )(ctx);
  })(key);
