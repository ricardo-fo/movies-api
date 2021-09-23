import { ConfigModule, ConfigService } from '@nestjs/config';

const bull = {
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    redis: {
      host: configService.get('REDIS_HOST'),
      port: Number(configService.get('REDIS_PORT')),
    },
  }),
};

export default bull;
