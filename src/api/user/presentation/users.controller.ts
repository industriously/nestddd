import { IUserUsecase, UserSchema } from '@INTERFACE/user';
import { TypedParam } from '@nestia/core';
import { Controller, Get, Inject } from '@nestjs/common';
import { UserUsecaseToken } from '@USER/_constants_';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UserUsecaseToken) private readonly userUsecase: IUserUsecase,
  ) {}

  /**
   * 사용자 프로필 조회 API
   * @tag user
   */
  @Get(':user_id')
  getPulicProfile(
    @TypedParam('user_id', 'uuid') id: string,
  ): Promise<UserSchema.Public> {
    return this.userUsecase.getPublic(id);
  }
}
