import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { PrismaService } from './../prisma/prisma.service';

import { TokenPayload } from './tokenPayload.interface';

import { AuthenticateUserDto } from './dto/authenticate-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Tenta autenticar um usuário.
   */
  async authenticate(authenticateUserDto: AuthenticateUserDto) {
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

    // Insere o token de acesso

    return user;
  }

  /**
   * Verifica se a senha é válida.
   */
  private async verifyPassword(hash: string, password: string) {
    const hasMatched = await bcrypt.compare(password, hash);
    if (!hasMatched) {
      throw new ForbiddenException('As senhas são inválidas.');
    }
  }

  getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);

    return `Authentication=${token}; HttpOnly; Path =/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
