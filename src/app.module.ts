import * as Joi from '@hapi/joi';

import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AuthenticationModule } from './authentication/authentication.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    UsersModule,
    PrismaModule,
    MoviesModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
