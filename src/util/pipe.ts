import { UnaryFunction as RxUnaryFunction } from 'rxjs';
import { isPromise } from './is_promise';

type UnaryFunction<T, R> = RxUnaryFunction<T, R | Promise<R>>;
type AsyncUnaryFunction<T, R> = RxUnaryFunction<T, Promise<R>>;

export function pipeAsync<T, R>(): AsyncUnaryFunction<T, R>;
export function pipeAsync<T, A>(
  fn1: UnaryFunction<T, A>,
): AsyncUnaryFunction<T, A>;
export function pipeAsync<T, A, B>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
): AsyncUnaryFunction<T, B>;
export function pipeAsync<T, A, B, C>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
): AsyncUnaryFunction<T, C>;
export function pipeAsync<T, A, B, C, D>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
  fn4: UnaryFunction<C, D>,
): AsyncUnaryFunction<T, D>;
export function pipeAsync<T, A, B, C, D, E>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
  fn4: UnaryFunction<C, D>,
  fn5: UnaryFunction<D, E>,
): AsyncUnaryFunction<T, E>;
export function pipeAsync<T, A, B, C, D, E, F>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
  fn4: UnaryFunction<C, D>,
  fn5: UnaryFunction<D, E>,
  fn6: UnaryFunction<E, F>,
): AsyncUnaryFunction<T, F>;
export function pipeAsync<T, A, B, C, D, E, F, G>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
  fn4: UnaryFunction<C, D>,
  fn5: UnaryFunction<D, E>,
  fn6: UnaryFunction<E, F>,
  fn7: UnaryFunction<F, G>,
): AsyncUnaryFunction<T, G>;
export function pipeAsync<T, A, B, C, D, E, F, G, H>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
  fn4: UnaryFunction<C, D>,
  fn5: UnaryFunction<D, E>,
  fn6: UnaryFunction<E, F>,
  fn7: UnaryFunction<F, G>,
  fn8: UnaryFunction<G, H>,
): AsyncUnaryFunction<T, H>;
export function pipeAsync<T, A, B, C, D, E, F, G, H, I>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
  fn4: UnaryFunction<C, D>,
  fn5: UnaryFunction<D, E>,
  fn6: UnaryFunction<E, F>,
  fn7: UnaryFunction<F, G>,
  fn8: UnaryFunction<G, H>,
  fn9: UnaryFunction<H, I>,
): AsyncUnaryFunction<T, I>;
export function pipeAsync<T, A, B, C, D, E, F, G, H, I>(
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
  fn4: UnaryFunction<C, D>,
  fn5: UnaryFunction<D, E>,
  fn6: UnaryFunction<E, F>,
  fn7: UnaryFunction<F, G>,
  fn8: UnaryFunction<G, H>,
  fn9: UnaryFunction<H, I>,
  ...fns: UnaryFunction<any, any>[]
): AsyncUnaryFunction<T, unknown>;

/**
 * pipeAsync() can be called on one or more functions, each of which can take one argument ("UnaryFunction")
 * and uses it to return a value.
 * It returns a function that takes one argument, passes it to the first UnaryFunction, and then
 * passes the result to the next one, passes that result to the next one, and so on.
 */
export function pipeAsync(
  ...fns: Array<UnaryFunction<any, any>>
): AsyncUnaryFunction<any, any> {
  return pipeFromArray(fns);
}

/** @internal */
function pipeFromArray<T, R>(
  fns: Array<UnaryFunction<T, R>>,
): AsyncUnaryFunction<T, R> {
  if (fns.length === 0) {
    return async (input) => input as unknown as R;
  }

  if (fns.length === 1) {
    const fn = fns[0];
    return async (input) => fn(input);
  }

  return async (input: T): Promise<R> => {
    let value: any = input;
    for (const fn of fns) {
      value = isPromise(value) ? fn(await value) : fn(value);
    }
    return value;
  };
}
