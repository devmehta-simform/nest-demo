import { IsEnum, IsString } from 'class-validator';
import { UserRole, type UserRoleType } from '../../types/user-role';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRoleType;
}
