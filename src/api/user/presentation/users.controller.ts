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
   *
   * 활성화된 사용자의 정보만 조회합니다.
   * @tag user
   * @param user_id 조회 대상의 id 입니다. uuid 타입만 허용합니다.
   * @returns 조회한 사용자의 공개 정보를 응답합니다.
   * @throw 400 Value of the URL parameter "user_id" is not a valid UUID.
   * @throw 404 일치하는 대상을 찾지 못했습니다.
   */
  @Get(':user_id')
  getPulicProfile(
    @TypedParam('user_id', 'uuid') id: string,
  ): Promise<UserSchema.Public> {
    return this.userUsecase.getPublic(id);
  }
}
