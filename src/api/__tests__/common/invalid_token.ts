import { HttpError } from '@nestia/fetcher';
import { HttpStatus } from '@nestjs/common';

export const validator_invalid_token = (err: HttpError) => {
  expect(err.status).toBe(HttpStatus.BAD_REQUEST);
  expect(err.message).toEqual('잘못된 토큰입니다.');
};
