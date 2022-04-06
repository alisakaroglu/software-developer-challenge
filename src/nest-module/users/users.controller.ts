import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/entities/users/user.entity';
import { CreateUsersDto, UpdateUsersDto } from 'src/interfaces/users/users.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get all Users
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.usersService.getAllUsers();
  }

  // get User by id
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get One User' })
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  // create User
  @Post()
  @ApiResponse({ type: User })
  @ApiBody({ type: User })
  @ApiOperation({ summary: 'Create New User' })
  async createUser(@Body() users: User): Promise<User> {
    return this.usersService.createUser(users);
  }

  // update User
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updatePost(@Param('id') id: string, @Body() users: UpdateUsersDto) {
    return this.usersService.updateUser(Number(id), users);
  }

  //delete User
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string) {
    this.usersService.deleteUser(Number(id));
  }
}
