import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { LoggerModule } from 'nestjs-pino';

import { AuthenticationModule } from './authentication/authentication.module';
import { SchedulerModule } from './cronjobs/scheduler.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import configSetup from './config/utils/config';
import loggerSetup from './config/utils/logger';
import { EmailModule } from './providers/email/email.module';
import { EmailService } from './providers/email/email.service';

@Module({
  imports: [
    LoggerModule.forRoot(loggerSetup),
    ConfigModule.forRoot(configSetup),
    ScheduleModule.forRoot(),
    UsersModule,
    PrismaModule,
    MoviesModule,
    AuthenticationModule,
    EmailModule,
    SchedulerModule,
  ],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
