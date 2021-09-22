import {
  ForbiddenException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';

import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';

import { PrismaService } from './../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  /**
   * @param {PrismaService} prismaService - Conexão com o banco de dados.
   */
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Cria um novo usuário.
   *
   * @param {CreateUserDto} userDto - Dados para a criação do usuário.
   *
   * @return {Promise<User>}
   */
  async create(userDto: CreateUserDto): Promise<User> {
    await this.canCreate(userDto);

    // Criptografa a senha
    const hash = await bcrypt.hash(userDto.password, 10);
    userDto.password = hash;

    const user = await this.prismaService.user.create({ data: userDto });
    user.password = undefined;
    return user;
  }

  /**
   * Verifica se um usuário pode ser criado.
   *
   * @param {CreateUserDto} userDto - Dados do usuário a serem verificados.
   */
  private async canCreate(userDto: CreateUserDto) {
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
  }

  /**
   * Busca por um usuário a partir de seu ID.
   *
   * @param {string} id - ID do usuário.
   *
   * @return {Promise<User>}
   */
  async getById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (user != null) return user;

    throw new NotFoundException('Usuário não encontrado');
  }
}
