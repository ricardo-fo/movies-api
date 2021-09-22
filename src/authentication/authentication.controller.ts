import {
  Controller,
  Post,
  HttpCode,
  UseGuards,
  Req,
  Res,
  Get,
} from '@nestjs/common';

import { User } from '@prisma/client';

import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';

import { Response } from 'express';

import { AuthenticationService } from './authentication.service';

import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import { RequestWithUser } from './interfaces/requestWithUser.interface';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  /**
   * Realiza o login de um usuário.
   *
   * @param {RequestWithUser} request  - Dados do usuário;
   * @param {Response}        response - Resposta à requisição.
   *
   * @return {Response}
   */
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  logIn(@Req() request: RequestWithUser, @Res() response: Response): Response {
    const { user } = request;
    const cookie = this.service.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  /**
   * Realiza o logout de um usuário.
   *
   * @param {RequestWithUser} request  - Dados do usuário;
   * @param {Response}        response - Resposta à requisição.
   *
   * @return {Response}
   */
  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  logOut(@Req() request: RequestWithUser, @Res() response: Response): Response {
    response.setHeader('Set-Cookie', this.service.getCookieForLogOut());
    return response.sendStatus(200);
  }

  /**
   * Exibe os dados de login de um usuário.
   *
   * @param {RequestWithUser} request - Dados do usuário;
   *
   * @return {User}
   */
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  authenticate(@Req() request: RequestWithUser): User {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
