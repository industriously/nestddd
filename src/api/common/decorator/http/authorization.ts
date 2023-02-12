import { HttpExceptionFactory } from '@COMMON/exception';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

type TOKEN_TYPE = 'basic' | 'bearer';

export const Authorization = (token_type: TOKEN_TYPE) =>
  createParamDecorator((type: TOKEN_TYPE, ctx: ExecutionContext) => {
    const authorization = ctx.switchToHttp().getRequest<Request>().headers[
      'authorization'
    ];
    if (authorization == undefined) {
      throw HttpExceptionFactory(
        'Forbidden',
        'Authorization header is required.',
      );
    }
    const regex = new RegExp(`^${type}\\s+\\S+`, 'i');
    const token = authorization.match(regex);
    if (token == undefined) {
      throw HttpExceptionFactory('Forbidden', `${type} token is invalid.`);
    }
    return token[0].split(/\s+/)[1];
  })(token_type);
