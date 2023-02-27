import { THROW_THEN_DECORATOR_KEY } from '@COMMON/constants';
import { SetMetadata } from '@nestjs/common';

export const ThrowThen: (then: (err: unknown) => any) => MethodDecorator = (
  then,
) => {
  return SetMetadata(THROW_THEN_DECORATOR_KEY, then);
};
