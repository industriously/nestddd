import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import type { Request } from 'express';
import { throw_if_null } from '../../util';

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

export const type_cast = (val: string, type: QueryType) => {
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
  const typecast_exception = new BadRequestException(
    `Value of the URL query '${key}' is not a ${type}.`,
  );

  if (value == undefined) {
    if (nullable) {
      return undefined;
    } else {
      throw new BadRequestException(
        `Value of the URL query '${key}' is required.`,
      );
    }
  }

  if (Array.isArray(value)) {
    if (!multiple) {
      throw new BadRequestException(
        `Value of the URL query '${key}' is not a single.`,
      );
    }
    return value.map((item) =>
      throw_if_null(type_cast(item, type), typecast_exception),
    );
  }

  const casted = throw_if_null(type_cast(value, type), typecast_exception);
  return multiple ? [casted] : casted;
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
    const request = ctx.switchToHttp().getRequest<
      Request<
        {
          [key: string]: string;
        },
        any,
        any,
        { [key: string]: string | string[] | undefined }
      >
    >();
    const value = request.query[_key];
    return query_typecast(_key, value, options);
  })(key);
