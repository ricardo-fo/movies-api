import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

import { CronJob } from 'cron';

import { EmailService } from './../../providers/email/email.service';

import { EmailScheduleDto } from './dto/email-schedule.dto';

@Injectable()
export default class EmailSchedulingService {
  private readonly logger = new Logger(EmailSchedulingService.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  scheduleEmail(emailSchedule: EmailScheduleDto) {
    const date = new Date(emailSchedule.date);
    const job = new CronJob(date, () => {
      this.emailService.sendMail({
        to: emailSchedule.recipient,
        subject: emailSchedule.subject,
        text: emailSchedule.content,
      });
    });

    this.schedulerRegistry.addCronJob(
      `${Date.now()}-${emailSchedule.subject}`,
      job,
    );
    job.start();

    this.logger.log(`Email agendado para ${emailSchedule.recipient}`);
  }
}
