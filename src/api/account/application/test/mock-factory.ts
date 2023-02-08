import { Domain } from '@INTERFACE/account';
import { IProfile } from '@INTERFACE/common';

export const factory = {
  profile: {
    sub: 'sub',
    oauth_type: 'google',
    email: 'test@test.com',
    username: 'testuser',
  } satisfies IProfile,
  account: {
    id: 'account1',
    sub: 'sub',
    oauth_type: 'google',
    email: 'test@test.com',
    username: 'testuser',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
  } satisfies Domain.State,
};
