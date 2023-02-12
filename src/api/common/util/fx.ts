export namespace FxUtil {
  export const map =
    <T, R>(iter: (_: T) => R) =>
    (input: T | null | undefined) => {
      if (input == null) {
        return null;
      }
      return iter(input);
    };
  export namespace Array {
    export const map =
      <T, R>(iter: (_: T) => R) =>
      (input: T[]) => {
        return input.map(iter);
      };
  }
}
