import type { IProfile } from '@INTERFACE/common';
import { PROFILEKEY } from '@COMMON/constants';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import typia from 'typia';

export const Profile = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    return typia.assertEquals<IProfile>(
      ctx.switchToHttp().getRequest()[PROFILEKEY],
    );
  },
);
