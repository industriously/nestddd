import { edge } from './edge';
import { Nullish } from './nullish';

export const map =
  <T, R>(iter: (_: T) => R) =>
  (input: T | Nullish.Nullish): R | null => {
    return edge(
      Nullish.is,

      () => null,

      iter,
    )(input);
  };
