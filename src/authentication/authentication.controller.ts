import {
  Controller,
  Post,
  HttpCode,
  UseGuards,
  Req,
  Res,
  Get,
} from '@nestjs/common';

import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

import { Response } from 'express';

import { AuthenticationService } from './authentication.service';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { RequestWithUser } from './requestWithUser.interface';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.service.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthenticationGuard)
  logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.service.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
