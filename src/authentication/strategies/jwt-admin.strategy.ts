import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenPayload } from '../interfaces/tokenPayload.interface';
import { UserTypes } from '../utils/user-types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.userId },
    });
    if (user.userTypeId == UserTypes.TYPE_ADMIN) {
      return user;
    }

    return false;
  }
}
