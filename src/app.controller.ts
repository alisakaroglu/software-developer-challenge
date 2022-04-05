import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { AuthService } from './nest-module/auth/auth.service';

@ApiOAuth2(['pets:write'])
@Controller()
@ApiTags('Auth For Google')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  // @Get()
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req){
  //   return;
  // }


}
