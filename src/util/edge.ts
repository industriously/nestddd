export const edge =
  <T, U, L, R = L>(
    predicate: (input: T | U) => input is T,
    left: (_: T) => L,
    right: (_: U) => R,
  ) =>
  (input: T | U): L | R => {
    return predicate(input) ? left(input) : right(input);
  };
