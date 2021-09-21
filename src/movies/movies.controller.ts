import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';

import JwtAuthenticationAdminGuard from './../authentication/jwt-authentication-admin.guard';
import JwtAuthenticationGuard from './../authentication/jwt-authentication.guard';

import { MoviesService } from './movies.service';

import { CreateMovieDto } from './dto/create-movie.dto';

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
  get() {
    return this.service.get();
  }
}
