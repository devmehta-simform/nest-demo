import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { type UserRoleType } from '../types/user-role';
import { USER_REPOSITORY } from '../constants/providers';
@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string, role: UserRoleType) {
    try {
      const user: User = await this.userRepository.findOneByOrFail({
        username,
        password,
        role,
      });
      if (user && user.password === password && user.role === role) {
        const token = this.jwtService.sign({
          username: user.username,
          id: user.id,
          role: user.role,
        });
        return { token };
      }
    } catch {
      return null;
    }
  }
}
