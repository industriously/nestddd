import { IUserRepository, IUserService, UserSchema } from '@INTERFACE/user';
import { Injectable } from '@nestjs/common';
import { UserBusiness } from './user.business';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

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
