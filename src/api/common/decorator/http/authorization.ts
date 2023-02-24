import { HttpExceptionFactory } from '@COMMON/exception';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Nullish } from '@UTIL';
import { Request } from 'express';
import { pipe } from 'rxjs';

type TOKEN_TYPE = 'basic' | 'bearer';

export const Authorization = (token_type: TOKEN_TYPE) =>
  createParamDecorator((type: TOKEN_TYPE, ctx: ExecutionContext) => {
    const extract_authorization_header = (context: ExecutionContext) =>
      context.switchToHttp().getRequest<Request>().headers['authorization'];

    const throw_if_authorization_header_empty = Nullish.throwIf(
      HttpExceptionFactory('Forbidden', 'Authorization header is required.'),
    )<string>;

    const validate_token_type = (input: string) =>
      input.match(new RegExp(`^${type}\\s+\\S+`, 'i'));

    const throw_if_invalid_token = Nullish.throwIf(
      HttpExceptionFactory('Forbidden', `${type} token is invalid.`),
    );

    const extract_token = (input: RegExpMatchArray) => input[0].split(/\s+/)[1];

    return pipe(
      extract_authorization_header,

      throw_if_authorization_header_empty,

      validate_token_type,

      throw_if_invalid_token,

      extract_token,
    )(ctx);
  })(token_type);
