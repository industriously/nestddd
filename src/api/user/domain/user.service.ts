import { IUserRepository, IUserService, UserSchema } from '@INTERFACE/user';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryToken } from '@USER/_constants_';
import { UserBusiness } from './user.business';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async activate(
    aggregate: UserSchema.Aggregate,
  ): Promise<UserSchema.Aggregate> {
    if (UserBusiness.isInActive(aggregate)) {
      await this.userRepository.update(aggregate.id, { is_deleted: false });
      return { ...aggregate, is_deleted: false };
    }
    return aggregate;
  }

  async inActivate(
    aggregate: UserSchema.Aggregate,
  ): Promise<UserSchema.Aggregate> {
    if (UserBusiness.isActive(aggregate)) {
      await this.userRepository.update(aggregate.id, { is_deleted: true });
      return { ...aggregate, is_deleted: true };
    }
    return aggregate;
  }
}
