import { SetMetadata } from '@nestjs/common';
import { type UserRoleType } from '../../types/user-role';

export const Roles = (...roles: UserRoleType[]) => SetMetadata(Roles, roles);
