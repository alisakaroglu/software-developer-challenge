import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginResponse } from 'src/interfaces/login-response.dto';
import { ErrorMessage } from 'src/interfaces/error-message.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No User from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      userName: user.username,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
