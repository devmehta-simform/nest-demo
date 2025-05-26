import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    try {
      const user: User = await this.userRepository.findOneByOrFail({
        username,
        password,
      });
      if (user && user.password === password) {
        const token = this.jwtService.sign({
          username: user.username,
          id: user.id,
        });
        return { token };
      }
    } catch {
      return null;
    }
  }
}
