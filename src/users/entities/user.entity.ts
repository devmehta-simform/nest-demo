import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { type UserRoleType, UserRole } from '../../types/user-role';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRoleType;

  @Column({ type: 'varchar' })
  xyz: string;
}
