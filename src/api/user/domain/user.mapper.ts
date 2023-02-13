import { UserDomain } from '@INTERFACE/user';
import { User } from '@PRISMA';
import { UnaryFunction } from 'rxjs';

export namespace UserMapper {
  export const toState: UnaryFunction<User, UserDomain.State> = (model) => {
    return { ...model };
  };

  export const toStateAsync: UnaryFunction<
    Promise<User>,
    Promise<UserDomain.State>
  > = async (model) => {
    return toState(await model);
  };

  export const toPublic: UnaryFunction<UserDomain.State, UserDomain.Public> = (
    state,
  ) => {
    const { id, email, username } = state;
    return { id, email, username };
  };

  export const toPublicAsync: UnaryFunction<
    Promise<UserDomain.State>,
    Promise<UserDomain.Public>
  > = async (model) => {
    return toPublic(await model);
  };

  export const toDetail: UnaryFunction<UserDomain.State, UserDomain.Detail> = (
    state,
  ) => {
    const {
      id,
      sub,
      oauth_type,
      email,
      username,
      phone,
      address,
      created_at,
      updated_at,
    } = state;
    return {
      id,
      sub,
      oauth_type,
      email,
      username,
      phone,
      address,
      created_at,
      updated_at,
    };
  };
  export const toDetailAsync: UnaryFunction<
    Promise<UserDomain.State>,
    Promise<UserDomain.Detail>
  > = async (model) => {
    return toDetail(await model);
  };
}
