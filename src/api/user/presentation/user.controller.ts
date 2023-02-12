import { Authorization } from '@COMMON/decorator/http';
import { IUserUsecase, UserDomain } from '@INTERFACE/user';
import { TypedBody, TypedParam } from '@nestia/core';
import { Controller, Delete, Get, Patch } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userUsecase: IUserUsecase) {}

  /**
   * 인증된 사용자 정보 요청
   *
   * @param token authorization header로 전달된 bearer token
   * @returns 사용자 정보
   * @tag user
   * @throw 403 권한 없음
   * @throw 404 존재하지 않는 사용자
   */
  @Get('user')
  getDetail(
    @Authorization('bearer') token: string,
  ): Promise<UserDomain.Detail> {
    return this.userUsecase.getDetail(token);
  }

  /**
   * 공개된 사용자 정보 요청
   *
   * @param id 사용자의 id
   * @returns 사용자 정보
   * @tag user
   * @throw 403 권한 없음
   * @throw 404 존재하지 않는 사용자
   */
  @Get('users/:user_id')
  getPublic(
    @TypedParam('user_id', 'string') id: string,
  ): Promise<UserDomain.Public> {
    return this.userUsecase.getPublic(id);
  }

  /**
   * 인증된 사용자 정보 변경
   *
   * @param token authorization header로 전달된 bearer token
   * @param body 변경할 사용자 정보
   * @tag user
   * @throw 400 잘못된 형식의 수정 데이터 전달
   * @throw 403 권한 없음
   */
  @Patch('user')
  update(
    @Authorization('bearer') token: string,
    @TypedBody() body: IUserUsecase.UpdateUserData,
  ): Promise<void> {
    return this.userUsecase.update(token, body);
  }

  /**
   * 인증된 사용자 정보 삭제 - 회원 탈퇴
   *
   * @param token authorization header로 전달된 bearer token
   * @tag user
   * @throw 403 권한 없음
   */
  @Delete('user')
  remove(@Authorization('bearer') token: string): Promise<void> {
    return this.userUsecase.remove(token);
  }
}
