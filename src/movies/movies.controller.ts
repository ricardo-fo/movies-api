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

import JwtAuthenticationAdminGuard from '../authentication/guards/jwt-authentication-admin.guard';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';

import { MoviesService } from './movies.service';

import { Movie } from '.prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GET_MOVIES_CACHE_KEY } from './utils/moviesCacheKeys.constant';

@Controller('movies')
export class MoviesController {
  constructor(private readonly service: MoviesService) {}

  /**
   * Cria um novo filme.
   *
   * @param {CreateMovieDto} movieDto - Dados do filme.
   *
   * @return {Promise<Movie>}
   */
  @Post()
  @UseGuards(JwtAuthenticationAdminGuard)
  create(@Body() movieDto: CreateMovieDto): Promise<Movie> {
    return this.service.create(movieDto);
  }

  /**
   * Busca por todos os filmes cadastrados.
   *
   * @return {Promise<Movie[]>}
   */
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheKey(GET_MOVIES_CACHE_KEY)
  get(): Promise<Movie[]> {
    return this.service.get();
  }
}
