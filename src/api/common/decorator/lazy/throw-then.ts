import { THROW_THEN_DECORATOR_KEY } from '@COMMON/constants';
import { MethodMarker } from '@INTERFACE/common';
import { SetMetadata } from '@nestjs/common';

export const ThrowThen: (then: (err: unknown) => any) => MethodDecorator = (
  then,
) => {
  return SetMetadata(THROW_THEN_DECORATOR_KEY, then);
};

export const ThrowThenMarker: MethodMarker<(err: unknown) => any> =
  (then) => (target) => {
    Reflect.defineMetadata(THROW_THEN_DECORATOR_KEY, then, target);
    return;
  };
