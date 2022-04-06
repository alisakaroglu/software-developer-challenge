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

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.find(x => x.password === pass)) {
      return {...user};
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      email: user.email,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
