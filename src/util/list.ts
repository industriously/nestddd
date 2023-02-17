export namespace List {
  export const map =
    <T, R>(iter: (_: T) => R) =>
    (input: T[]) => {
      return input.map(iter);
    };

  export const filter =
    <T, S extends T = T>(predicate: (value: T) => value is S) =>
    (input: T[]): S[] => {
      return input.filter<S>(predicate);
    };
}
