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

  export const filter =
    <T, S extends T = T>(predicate: (value: T) => boolean) =>
    (input: T[]) =>
      input.filter(predicate) as S[];
}
