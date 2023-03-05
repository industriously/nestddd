import { Authorization } from '@COMMON/decorator/http';
import { IUserUsecase, UserSchema } from '@INTERFACE/user';
import { Body, Controller, Delete, Get, Inject, Patch } from '@nestjs/common';
import { UserUsecaseToken } from '@USER/_constants_';
import typia from 'typia';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserUsecaseToken) private readonly userUsecase: IUserUsecase,
  ) {}

  /**
   * 내 프로필 보기 API
   * @tag user
   * @returns 사용자 상세 정보 응답
   * @throw 400 잘못된 토큰입니다.
   * @throw 404 일치하는 대상을 찾지 못했습니다.
   */
  @Get()
  getProfile(
    @Authorization('bearer') token: string,
  ): Promise<UserSchema.Detail> {
    return this.userUsecase.getDetail(token);
  }

  /**
   * 내 정보 수정 API
   * @tag user
   * @param body 수정할 정보를 포함합니다.
   * @returns
   * @throw 400 잘못된 토큰입니다.
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
   * 내 계정 비활성화 API
   *
   * 사용자는 로그인을 통해 계정을 활성화할 수 있습니다.
   *
   * 비활성화된 계정은 조회되지 않습니다.
   * @tag user
   * @returns
   * @throw 400 잘못된 토큰입니다.
   */
  @Delete()
  inActivate(@Authorization('bearer') token: string): Promise<void> {
    return this.userUsecase.remove(token);
  }
}
