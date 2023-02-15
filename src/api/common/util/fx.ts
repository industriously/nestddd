export namespace FxUtil {
  type Nullish = null | undefined;

  export interface UnaryFunction<T, R> {
    (input: T): R | Promise<R>;
  }
  export interface UnaryAsyncFunction<T, R> {
    (input: Promise<T>): Promise<R>;
  }
  export type AsyncUnary<F extends (_: any) => any> = F extends (
    input: infer P,
  ) => infer R
    ? UnaryAsyncFunction<P, Awaited<R>>
    : never;

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
  export const asyncUnary =
    <T, R>(unary: UnaryFunction<T, R>): UnaryAsyncFunction<T, R> =>
    async (input) => {
      return unary(await input);
    };

  export const throwIfNullishAsync =
    (error: unknown) =>
    async <T>(input: Promise<T | Nullish>): Promise<T> => {
      const output = await input;
      if (isNullish(output)) {
        throw error;
      }
      return output;
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
