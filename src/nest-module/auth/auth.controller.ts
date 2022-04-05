import { Controller, Post, UseGuards, Request, Get, Req, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequest } from 'src/interfaces/login-request.dto';
import { UserLoginResponse } from 'src/interfaces/login-response.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiBearerAuth()
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @ApiResponse({ type: UserLoginResponse })
  @ApiBody({ type: LoginRequest })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login with username and password' })
  @HttpCode(HttpStatus.OK)
  async login(@Request() req,
  ) {
    return this.authService.login(req.user);
  }
  // @UseGuards(AuthGuard('local'))
  // @ApiHeader({
  //   name: AppConsts.deviceNameHeader,
  //   required: false,
  // })

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('/google/callback')
  @ApiOperation({ summary: 'Auth with google' })
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
