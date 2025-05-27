import { type UserRoleType } from '../../types/user-role';

export class CreateUserDto {
  username: string;
  password: string;
  role: UserRoleType;
}
