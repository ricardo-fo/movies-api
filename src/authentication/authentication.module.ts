import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from './../prisma/prisma.module';
import JwtSetup from '../config/utils/jwt';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

import { JwtAdminStrategy } from './strategies/jwt-admin.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync(JwtSetup),
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    JwtAdminStrategy,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
