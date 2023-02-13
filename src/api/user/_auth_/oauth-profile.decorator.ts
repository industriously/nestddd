import { UserSchema } from '@INTERFACE/user';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import typia from 'typia';
import { OAUTH_PROFILE } from '../_constants_/oauth-profile.request-key';

export const OauthProfile = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    return typia.assertEquals<UserSchema.OauthProfile>(
      ctx.switchToHttp().getRequest()[OAUTH_PROFILE],
    );
  },
);
