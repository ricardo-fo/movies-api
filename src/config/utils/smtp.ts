import { ConfigService } from '@nestjs/config';

const smtp = (configService: ConfigService) => {
  return {
    service: configService.get('EMAIL_SERVICE'),
    host: configService.get('SMTP_HOST'),
    port: configService.get('SMTP_PORT'),
    auth: {
      user: configService.get('SMTP_AUTH_USER'),
      pass: configService.get('SMTP_AUTH_PASS'),
    },
  };
};

export default smtp;
