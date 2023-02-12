import { UnaryFunction } from 'rxjs';

export namespace FxUtil {
  type Nullish = null | undefined;
  type Func = (...args: any[]) => unknown;
  type AsyncFunc = (...args: any[]) => Promise<unknown>;

  export const map =
    <T, R>(iter: (_: T) => R) =>
    (input: T | Nullish) => {
      if (input == null) {
        return null;
      }
      return iter(input);
    };
  export const isNullish = <T = unknown>(
    input: T | Nullish,
  ): input is Nullish => {
    return input == null;
  };
  export const isNotNullish = <T>(
    input: T | Nullish,
  ): input is NonNullable<T> => {
    return !isNullish(input);
  };
  export const throwIfNullish =
    (error: unknown) =>
    <T>(input: T | Nullish): T => {
      if (isNullish(input)) {
        throw error;
      }
      return input;
    };
  export const asyncMapper = <T, R>(
    unary: UnaryFunction<T, R>,
  ): UnaryFunction<Promise<T>, Promise<R>> => {
    return async (input: Promise<T>) => unary(await input);
  };
  export const returnVoid = <T extends (...args: infer A) => infer R>(
    callback: T,
  ) => {
    return (...args: A): void => {
      callback(...args);
      return;
    };
  };
  export const returnAsyncVoid = (callback: AsyncFunc) => {
    return async (...args: any[]): Promise<void> => {
      await callback(...args);
      return;
    };
  };
}

export namespace FxUtil {
  export namespace Array {
    export const map =
      <T, R>(iter: (_: T) => R) =>
      (input: T[]) => {
        return input.map(iter);
      };
  }
}
