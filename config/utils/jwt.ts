import { ConfigModule, ConfigService } from '@nestjs/config';

const jwt = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
    },
  }),
};

export default jwt;
