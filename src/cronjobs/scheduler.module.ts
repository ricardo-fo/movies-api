import { Module } from '@nestjs/common';

import { EmailModule } from './../providers/email/email.module';

import EmailSchedulingService from './services/emailScheduling.service';

@Module({
  imports: [EmailModule],
  providers: [EmailSchedulingService],
  exports: [EmailSchedulingService],
})
export class SchedulerModule {}
