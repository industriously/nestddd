export namespace List {
  export const map =
    <T, R>(iter: (_: T) => R) =>
    (input: T[]) => {
      return input.map(iter);
    };

  export const each =
    <T>(iter: (input: T) => void) =>
    (input: T[]) =>
      input.forEach(iter);

  interface Filter {
    <T, S extends T>(predi: (item: T | S) => item is S): (input: T[]) => S[];
    <T>(predi: (_: T) => boolean): (input: T[]) => T[];
  }

  export const filter: Filter =
    <T, S extends T = T>(predicate: (item: T) => boolean) =>
    (input: T[]) =>
      input.filter(predicate) as S[];

  export const isEmpty = <T>(list: T[]): boolean => list.length === 0;

  export const throwIfEmpty =
    (err: unknown) =>
    <T>(list: T[]): T[] => {
      if (isEmpty(list)) {
        throw err;
      }
      return list;
    };
}
