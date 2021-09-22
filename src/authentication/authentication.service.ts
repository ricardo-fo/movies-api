import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';

import { PrismaService } from './../prisma/prisma.service';

import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { TokenPayload } from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Tenta autenticar um usuário.
   *
   * @param {AuthenticateUserDto} authenticateUserDto - Dados do usuário.
   *
   * @return {Promise<User>}
   */
  async authenticate(authenticateUserDto: AuthenticateUserDto): Promise<User> {
    const { email, password } = authenticateUserDto;

    // Busca pelo usuário
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    // Verifica se as senhas correspondem
    try {
      await this.verifyPassword(user.password, password);
      user.password = undefined;
    } catch (error) {
      throw new ForbiddenException('Email ou senha incorreto(s).');
    }

    return user;
  }

  /**
   * Verifica se a senha fornecida é válida.
   *
   * @param {string} hash     - Hash da senha;
   * @param {string} password - Senha fornecida.
   */
  private async verifyPassword(hash: string, password: string) {
    const hasMatched = await bcrypt.compare(password, hash);
    if (!hasMatched) {
      throw new ForbiddenException('As senhas são inválidas.');
    }
  }

  /**
   * Gera uma string contendo o token do usuário e o tempo de expiração
   * do token, onde essa string deve ser usada com um cookie de login.
   *
   * @param {string} userId - ID do usuário.
   *
   * @return {string}
   */
  getCookieWithJwtToken(userId: string): string {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);

    return `Authentication=${token}; HttpOnly; Path =/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  /**
   * Gera uma string sem o token do usuário e sem o tempo de expiração
   * do token, onde essa string deve ser usada como um cookie de logout.
   *
   * @return {string}
   */
  getCookieForLogOut(): string {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
