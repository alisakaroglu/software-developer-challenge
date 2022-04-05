import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginRequest {
  @ApiProperty()
  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  password: string;

}