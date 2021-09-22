import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { LoggerModule } from 'nestjs-pino';

import configSetup from './config/utils/config';
import loggerSetup from './config/utils/logger';

import { AuthenticationModule } from './authentication/authentication.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    LoggerModule.forRoot(loggerSetup),
    ConfigModule.forRoot(configSetup),
    UsersModule,
    PrismaModule,
    MoviesModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
