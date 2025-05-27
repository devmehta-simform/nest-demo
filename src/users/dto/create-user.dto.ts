import { IsEnum, IsString } from 'class-validator';
import { UserRole, type UserRoleType } from '../../types/user-role';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRoleType;
}
