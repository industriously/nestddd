import { HttpExceptionFactory } from '@COMMON/exception';
import { IUserUsecase, UserSchema } from '@INTERFACE/user';
import { UserUsecase } from '@USER/application';
import typia from 'typia';
import { userRepository } from './user.repository.mock';

describe('User Usecase Test', () => {
  const usecase: IUserUsecase = new UserUsecase(userRepository);

  // test data
  const { id } = typia.random<Pick<UserSchema.Aggregate, 'id'>>();

  describe("get user's public data", () => {
    it('If user not exist', async () => {
      const spyOnFindOne = jest.spyOn(userRepository, 'findOne');
      spyOnFindOne.mockImplementationOnce(async () => null);

      const received = usecase.getPublic(id);

      await expect(received).rejects.toThrow(HttpExceptionFactory('NotFound'));
    });
    it('If user exist', async () => {
      const received = await usecase.getPublic(id);

      typia.assertEquals<UserSchema.Public>(received);
    });
  });

  describe("get user's detail data", () => {
    it('If token invalid', () => {});
    it('If user not exist', async () => {
      const spyOnFindOne = jest.spyOn(userRepository, 'findOne');
      spyOnFindOne.mockImplementationOnce(async () => null);

      const received = usecase.getDetail(id);

      await expect(received).rejects.toThrow(HttpExceptionFactory('NotFound'));
    });
    it('If user exist', async () => {
      const received = await usecase.getDetail(id);

      typia.assertEquals<UserSchema.Detail>(received);
    });
  });

  describe('update user data', () => {
    it('If token invalid', () => {});
    it('If token valid', async () => {
      await usecase.update('token', {} as IUserUsecase.UpdateData);
    });
  });
  describe('remove user', () => {
    it('If token invalid', () => {});
    it('If token valid', async () => {
      await usecase.remove('token');
    });
  });
});
