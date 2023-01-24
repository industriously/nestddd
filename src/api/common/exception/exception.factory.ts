import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpExceptionMessage } from './exception.message';

export type HttpExceptionStatus =
  | 'BadRequest'
  | 'UnAuthorized'
  | 'Forbidden'
  | 'NotFound'
  | 'ISE';

export const HttpExceptionFactory = (
  status: HttpExceptionStatus,
  message?: string,
): HttpException => {
  switch (status) {
    case 'BadRequest':
      return new BadRequestException(message ?? HttpExceptionMessage.BR);
    case 'UnAuthorized':
      return new UnauthorizedException(message ?? HttpExceptionMessage.UAE);
    case 'Forbidden':
      return new ForbiddenException(message ?? HttpExceptionMessage.FBD);
    case 'NotFound':
      return new NotFoundException(message ?? HttpExceptionMessage.NF);
    case 'ISE':
    default:
      return new InternalServerErrorException(
        message ?? HttpExceptionMessage.ISE,
      );
  }
};
