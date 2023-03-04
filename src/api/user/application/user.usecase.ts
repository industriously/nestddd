import { UserMapper } from '@USER/domain';
import { ProviderBuilder, pipeAsync, Nullish } from '@UTIL';
import { ITokenService, TokenSchema } from '@INTERFACE/token';
import { IUserRepository, IUserUsecase } from '@INTERFACE/user';
import { HttpExceptionFactory } from '@COMMON/exception';
import { pipe } from 'rxjs';

export const UserUsecaseFactory = (
  repository: IUserRepository,
  tokenService: ITokenService,
): IUserUsecase => {
  const get_id_from_token = () =>
    [
      tokenService.getAccessTokenPayload,
      ({ id }: TokenSchema.AccessTokenPayload) => id,
    ] as const;
  return ProviderBuilder<IUserUsecase>({
    getPublic(id) {
      return pipeAsync(
        repository.findOne(),

        Nullish.throwIf(HttpExceptionFactory('NotFound')),

        UserMapper.toPublic,
      )(id);
    },

    getDetail(token) {
      return pipeAsync(
        ...get_id_from_token(),

        repository.findOne(),

        Nullish.throwIf(HttpExceptionFactory('NotFound')),

        UserMapper.toDetail,
      )(token);
    },

    update(token, data) {
      return pipe(
        ...get_id_from_token(),

        repository.update(data),
      )(token);
    },
    remove(token) {
      return pipe(
        ...get_id_from_token(),

        repository.remove,
      )(token);
    },
  }).build();
};
