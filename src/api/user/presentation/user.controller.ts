import { Authorization } from '@COMMON/decorator/http';
import { IUserUsecase, UserSchema } from '@INTERFACE/user';
import { TypedParam } from '@nestia/core';
import { Body, Controller, Delete, Get, Inject, Patch } from '@nestjs/common';
import { UserUsecaseToken } from '@USER/_constants_';
import typia from 'typia';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserUsecaseToken) private readonly userUsecase: IUserUsecase,
  ) {}

  /**
   * @tag user
   */
  @Get()
  getProfile(
    @Authorization('bearer') token: string,
  ): Promise<UserSchema.Detail> {
    return this.userUsecase.getDetail(token);
  }

  /**
   * @tag user
   */
  @Get(':user_id')
  getPublicProfile(
    @TypedParam('user_id', 'uuid') id: string,
  ): Promise<UserSchema.Public> {
    return this.userUsecase.getPublic(id);
  }

  /**
   * @tag user
   */
  @Patch()
  updateProfile(
    @Authorization('bearer') token: string,
    @Body() body: IUserUsecase.UpdateData,
  ): Promise<void> {
    const updateData = typia.assertPrune<IUserUsecase.UpdateData>(body);
    return this.userUsecase.update(token, updateData);
  }

  /**
   * @tag user
   */
  @Delete()
  inActivate(@Authorization('bearer') token: string): Promise<void> {
    return this.userUsecase.remove(token);
  }
}
