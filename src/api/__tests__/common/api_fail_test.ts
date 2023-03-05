import { HttpError } from '@nestia/fetcher';

export const test_error =
  <T>(api: (data: T) => Promise<unknown>) =>
  (validator: (err: HttpError) => void) =>
  async (data: T) => {
    try {
      await api(data);
      throw Error('Unexpected Success!');
    } catch (error) {
      if (!(error instanceof HttpError)) {
        throw error;
      }
      validator(error);
    }
  };
