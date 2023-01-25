export interface IProfile {
  username: string;
  /**
   * @format email
   */
  email: string;
}

export const ProfileKey = 'profile';
export type ProfileKey = typeof ProfileKey;
