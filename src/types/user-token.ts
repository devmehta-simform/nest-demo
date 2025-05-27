import { type UserRoleType } from '../types/user-role';

export class UserToken {
  username: string;
  id: number;
  role: UserRoleType;
}
