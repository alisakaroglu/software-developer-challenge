import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users/user.entity';
import { CreateUsersDto, UpdateUsersDto } from 'src/interfaces/users/users.dto';
import { Repository } from 'typeorm';

// This should be a real class/interface representing a user entity
export type UserTest = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private readonly usersTest = [
    {
      userId: 1,
      username: 'ali',
      password: '1234',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User[] | undefined> {
    return this.userRepository.find({ where: { email: email } });
  }

  // async findOne(email: string){
  //   const user = await this.userRepository.find({ where: { email: email } });
  //   console.log(user);
    
  //   return user;
  // }

  // find all
  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // find by id
  async getUserById(id: number): Promise<User> {
    const users = await this.userRepository.findOne({ where: { id: id } });
    if (users) {
      return users;
    }
    throw new HttpException('users not found', HttpStatus.NOT_FOUND);
  }

  // create
  async createUser(user: User) {
    const newUser = await this.userRepository.create(user);
    await this.userRepository.save(newUser);

    return newUser;
  }

  // update
  async updateUser(id: number, post: UpdateUsersDto) {
    await this.userRepository.update(id, post);
    const updatedUser = await this.userRepository.findOne({
      where: { id: id },
    });
    if (updatedUser) {
      return updatedUser;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  // delete
  async deleteUser(id: number) {
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
