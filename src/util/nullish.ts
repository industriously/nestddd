import { asyncUnary } from './async_unary';
import { Predicate } from './predicate';

export namespace Nullish {
  export type Nullish = null | undefined;

  export const is = <T = unknown>(input: T | Nullish): input is Nullish => {
    return input == null;
  };

  export const isNot = <T = unknown>(input: T | Nullish): input is T => {
    return Predicate.negate(is)(input);
  };

  export const throwIf =
    (err: unknown) =>
    <T>(input: T | Nullish): T => {
      if (is(input)) {
        throw err;
      }
      return input;
    };

  export const throwIfAsync = (err: unknown) => asyncUnary(throwIf(err));
}
