import { Injectable } from '@nestjs/common';

import { PrismaService } from './../prisma/prisma.service';

import { Movie } from '.prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Cria um novo filme.
   *
   * @param {CreateMovieDto} movieDto - Dados do filme.
   *
   * @return {Promise<Movie>}
   */
  async create(movieDto: CreateMovieDto): Promise<Movie> {
    return this.prismaService.movie.create({ data: movieDto });
  }

  /**
   * Busca por todos os filmes.
   *
   * @return {Promise<Movie[]>}
   */
  async get(): Promise<Movie[]> {
    return this.prismaService.movie.findMany();
  }
}
