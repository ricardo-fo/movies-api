import { Body, Controller, Post } from '@nestjs/common';

import { User } from '@prisma/client';

import EmailSchedulingService from 'src/cronjobs/services/emailScheduling.service';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly emailService: EmailSchedulingService,
  ) {}

  /**
   * Cria um novo usuário.
   *
   * @param {CreateUserDto} userDto - Dados para a criação do usuário.
   *
   * @return {Promise<User>}
   */
  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<User> {
    const user = await this.service.create(userDto);

    const date = new Date();
    date.setSeconds(date.getSeconds() + 20);
    this.emailService.scheduleEmail({
      recipient: userDto.email,
      subject: 'Conta criada com sucesso.',
      content: 'Bem-vindo ao time :)',
      date: `${date}`,
    });
    return user;
  }
}
