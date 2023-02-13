import { UnaryFunction } from 'rxjs';

export namespace FxUtil {
  type Nullish = null | undefined;

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
  export const asyncUnary = <T, R>(
    unary: UnaryFunction<T, R>,
  ): UnaryFunction<Promise<T>, Promise<R>> => {
    return async (input: Promise<T>) => unary(await input);
  };

  const returnVoid = <T extends (...args: any[]) => any>(callback: T) => {
    return (...args: Parameters<T>): void => {
      callback(...args);
      return;
    };
  };

  const returnAsyncVoid = <T extends (...args: any[]) => any>(callback: T) => {
    return async (...args: Parameters<T>): Promise<void> => {
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
