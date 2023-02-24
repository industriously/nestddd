import { UnaryFunction } from 'rxjs';

export const asyncUnary =
  <T, R>(unary: UnaryFunction<T, R>) =>
  async (input: Promise<Awaited<T>>): Promise<Awaited<R>> => {
    return unary(await input) as Awaited<R>;
  };
