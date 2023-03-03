import { Aspect, LazyDecorator, WrapParams } from '@toss/nestjs-aop';
import { THROW_THEN_DECORATOR_KEY } from '@COMMON/constants';
import { isPromise } from '@UTIL';

@Aspect(THROW_THEN_DECORATOR_KEY)
export class ThrowThenDecorator implements LazyDecorator {
  wrap({ method, metadata }: WrapParams<any, (err: unknown) => any>) {
    return (...args: unknown[]) => {
      try {
        const result = method(...args);
        if (isPromise(result)) {
          return tryAsync(result, metadata);
        }
        return result;
      } catch (error) {
        return metadata(error);
      }
    };
  }
}

const tryAsync = async (
  done: Promise<unknown>,
  metadata: (err: unknown) => any,
) => {
  try {
    return await done;
  } catch (error) {
    return metadata(error);
  }
};
