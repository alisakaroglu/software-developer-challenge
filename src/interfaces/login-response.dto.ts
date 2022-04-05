import { ApiProperty } from '@nestjs/swagger';

export class UserLoginResponse {
  @ApiProperty() accessToken?: string;
  @ApiProperty() userName: string;
}
