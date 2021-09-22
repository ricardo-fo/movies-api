import { Body, Controller, Post } from '@nestjs/common';

import { User } from '@prisma/client';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  /**
   * Cria um novo usuário.
   *
   * @param {CreateUserDto} userDto - Dados para a criação do usuário.
   *
   * @return {Promise<User>}
   */
  @Post()
  create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.service.create(userDto);
  }
}
