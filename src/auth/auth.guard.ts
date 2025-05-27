import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserToken } from '../types/user-token';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { type UserRoleType } from '../types/user-role';
import { Roles } from '../decorators/roles/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    try {
      const user: UserToken = this.jwtService.verify(token);
      const roles: UserRoleType[] = this.reflector.getAllAndOverride(Roles, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (roles.includes(user.role)) request['user'] = user;
      else throw new ForbiddenException();
    } catch (err: unknown) {
      if (err instanceof ForbiddenException) throw new ForbiddenException();
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
