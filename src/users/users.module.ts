import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { SchedulerModule } from './../cronjobs/scheduler.module';
import { PrismaModule } from './../prisma/prisma.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    PrismaModule,
    SchedulerModule,
    BullModule.registerQueue({ name: 'email' }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
