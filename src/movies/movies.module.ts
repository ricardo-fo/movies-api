import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import * as redisStore from 'cache-manager-redis-store';

import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    PrismaModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 120,
      }),
    }),
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
