import { ExceptionResponse } from '@INTERFACE/common';
import { HttpError } from '@nestia/fetcher';
import { HttpStatus } from '@nestjs/common';
import typia from 'typia';

export const validator_invalid_token = (err: HttpError) => {
  const received = typia.assertParse<ExceptionResponse>(err.message);

  expect(err.status).toBe(HttpStatus.BAD_REQUEST);
  expect(received).toEqual<ExceptionResponse>({
    statusCode: HttpStatus.BAD_REQUEST,
    message: '잘못된 토큰입니다.',
  });
};
