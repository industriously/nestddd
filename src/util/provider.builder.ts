import { FunctionType } from '@INTERFACE/common';

export interface ProviderBuilder<T extends object> {
  readonly build: () => T;
  readonly mark: (
    propertyKey: keyof T,
    marker: (target: FunctionType) => void,
  ) => ProviderBuilder<T>;
}

export const ProviderBuilder = <T extends object>(
  props: T,
): ProviderBuilder<T> => {
  const builder = {
    build: () => {},
    mark: () => {},
  } as unknown as ProviderBuilder<T>;

  const build: ProviderBuilder<T>['build'] = () =>
    Object.setPrototypeOf({}, props);

  const mark: ProviderBuilder<T>['mark'] = (key, marker) => {
    const target = props[key];
    const isFunction = (input: unknown): input is FunctionType =>
      typeof input === 'function';
    if (isFunction(target)) {
      marker(target);
    }
    return builder;
  };
  (builder as any).build = build;
  (builder as any).mark = mark;
  return builder;
};
