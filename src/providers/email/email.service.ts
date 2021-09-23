import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';

import smtpSetup from '../../config/utils/smtp';

@Injectable()
export class EmailService {
  private readonly nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport(smtpSetup(configService));
  }

  /**
   * Envia um email.
   *
   * @param {Mail.Options} options - Opções ao enviar.
   *
   * @return {Promise}
   */
  sendMail(options: Mail.Options): Promise<any> {
    return this.nodemailerTransport.sendMail(options);
  }
}
