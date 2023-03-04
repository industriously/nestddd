import { IAuthUsecase, UserSchema } from '@INTERFACE/user';
import typia from 'typia';

export namespace signIn {
  export const test_success =
    (usecase: IAuthUsecase) => async (profile: UserSchema.OauthProfile) => {
      const received = await usecase.signIn(profile);

      typia.assertEquals(received);
    };
}
