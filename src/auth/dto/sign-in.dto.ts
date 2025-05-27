import { ApiProperty } from '@nestjs/swagger';
import { UserRole, type UserRoleType } from '../../types/user-role';
import { IsEnum, IsString } from 'class-validator';

export class SignInDto {
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
