import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { userRepositoryProvider } from '../users/providers/users.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'mysecret',
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, userRepositoryProvider],
  controllers: [AuthController],
})
export class AuthModule {}
