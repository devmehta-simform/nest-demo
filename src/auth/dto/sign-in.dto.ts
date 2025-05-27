import { type UserRoleType } from '../../types/user-role';

export class SignInDto {
  username: string;
  password: string;
  role: UserRoleType;
}
