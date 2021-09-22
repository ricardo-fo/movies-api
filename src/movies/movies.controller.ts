import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  UseInterceptors,
  CacheInterceptor,
  CacheKey,
} from '@nestjs/common';

import JwtAuthenticationAdminGuard from './../authentication/jwt-authentication-admin.guard';
import JwtAuthenticationGuard from './../authentication/jwt-authentication.guard';

import { MoviesService } from './movies.service';

import { CreateMovieDto } from './dto/create-movie.dto';
import { GET_MOVIES_CACHE_KEY } from './utils/moviesCacheKeys.constant';

@Controller('movies')
export class MoviesController {
  constructor(private readonly service: MoviesService) {}

  @Post()
  @UseGuards(JwtAuthenticationAdminGuard)
  create(@Body() movieDto: CreateMovieDto) {
    return this.service.create(movieDto);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheKey(GET_MOVIES_CACHE_KEY)
  get() {
    return this.service.get();
  }
}
