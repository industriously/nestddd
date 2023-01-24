/**
 * throw exception if data is null or undefined.
 * @param data nullable한 데이터로서 data가 null인지 확인한다.
 * @param exception data가 null일 때, throw되는 객체
 * @returns null이 아닌 data를 반환한다.
 */
export const throw_if_null = <T>(
  data: T | null | undefined,
  exception: unknown,
): NotNull<Defined<T>> => {
  if (isNotNullable<T>(data)) {
    return data;
  }
  throw exception;
};

type NotNull<T> = null extends T ? never : T;
type Defined<T> = undefined extends T ? never : T;

const isNotNullable = <T>(data: unknown): data is NotNull<Defined<T>> =>
  data != null;
