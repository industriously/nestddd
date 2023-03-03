import { IEnv } from '@INTERFACE/common';
import { IUserRepository, UserSchema } from '@INTERFACE/user';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import typia from 'typia';

export const userRepository: IUserRepository = {
  async create(data) {
    const user = typia.random<UserSchema.Aggregate>();
    const now = new Date();
    return {
      ...user,
      ...data,
      is_deleted: false,
      created_at: now,
      updated_at: now,
    };
  },
  update() {
    return async () => {};
  },
  async findOneByOauth(filter) {
    const user = typia.random<UserSchema.Aggregate>();
    const now = new Date();
    return {
      ...user,
      ...filter,
      is_deleted: false,
      created_at: now,
      updated_at: now,
    };
  },
  findOne(include_deleted = false) {
    return async (id) => {
      const user = typia.random<UserSchema.Aggregate>();
      const now = new Date();
      return {
        ...user,
        id,
        is_deleted: include_deleted,
        created_at: now,
        updated_at: now,
      };
    };
  },
  async save(aggregate) {
    return aggregate;
  },
  async remove() {},
};

export const jwtService = new JwtService({
  signOptions: { algorithm: 'RS256' },
});
export const config: ConfigService<IEnv, true> = {
  get(key: keyof IEnv): string {
    switch (key) {
      case 'ACCESS_TOKEN_PRIVATE_KEY':
      case 'REFRESH_TOKEN_PRIVATE_KEY':
        return process.env.ACCESS_TOKEN_PRIVATE_KEY;
      case 'ACCESS_TOKEN_PUBLIC_KEY':
      case 'REFRESH_TOKEN_PUBLIC_KEY':
        return process.env.ACCESS_TOKEN_PUBLIC_KEY;
    }
    return 'test_env';
  },
} as any;
