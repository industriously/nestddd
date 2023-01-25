import { PROFILEKEY } from '@COMMON/constant';
import { IProfile } from '@INTERFACE/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import typia from 'typia';

export const Profile = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    return typia.assert<IProfile>(ctx.switchToHttp().getRequest()[PROFILEKEY]);
  },
);
