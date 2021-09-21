import {
  ForbiddenException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from './../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Cria um novo usuário.
   */
  async create(userDto: CreateUserDto) {
    // Verifica se o tipo de usuário é válido
    const hasType = await this.prismaService.userType.findUnique({
      where: { id: userDto.userTypeId },
    });
    if (hasType == null) {
      throw new NotFoundException('O tipo de usuário não existe.');
    }

    // Verifica se o email já está em uso já existe
    const hasUser = await this.prismaService.user.findMany({
      where: {
        OR: [{ email: userDto.email }, { username: userDto.username }],
      },
    });
    if (hasUser.length > 0) {
      throw new ForbiddenException('O email ou o username já existem');
    }

    // Criptografa a senha
    const hash = await bcrypt.hash(userDto.password, 10);
    userDto.password = hash;

    const user = await this.prismaService.user.create({ data: userDto });
    user.password = undefined;
    return user;
  }

  async getById(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (user != null) return user;

    throw new NotFoundException('Usuário não encontrado');
  }
}
