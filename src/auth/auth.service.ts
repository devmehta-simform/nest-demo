import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { type UserRoleType } from '../types/user-role';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string, role: UserRoleType) {
    const user: User | null = await this.userRepository.findOneBy({
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
    return undefined;
  }
}
