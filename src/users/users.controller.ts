import { Body, Controller, Post } from '@nestjs/common';

import { AuthenticateUserDto } from '../authentication/dto/authenticate-user.dto';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.service.create(userDto);
  }
}
