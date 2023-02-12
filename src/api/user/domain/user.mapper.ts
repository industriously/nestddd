import { UserDomain } from '@INTERFACE/user';
import { User } from '@PRISMA';
import { UnaryFunction } from 'rxjs';

export namespace UserMapper {
  export const toState: UnaryFunction<User, UserDomain.State> = (model) => {
    return { ...model };
  };

  export const toPublic: UnaryFunction<UserDomain.State, UserDomain.Public> = (
    state,
  ) => {
    const { id, email, username } = state;
    return { id, email, username };
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
}
