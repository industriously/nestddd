import { UnaryFunction } from 'rxjs';

export namespace Predicate {
  export const negate =
    <T>(predicate: UnaryFunction<T, boolean>) =>
    (input: T): boolean => {
      return !predicate(input);
    };

  export const or =
    <T>(...predicates: UnaryFunction<T, boolean>[]) =>
    (input: T): boolean => {
      return predicates.some((predi) => predi(input));
    };

  export const and =
    <T>(...predicates: UnaryFunction<T, boolean>[]) =>
    (input: T): boolean => {
      return predicates.every((predi) => predi(input));
    };
}
