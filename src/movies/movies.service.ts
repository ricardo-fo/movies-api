import { Injectable } from '@nestjs/common';

import { PrismaService } from './../prisma/prisma.service';

import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Cria um novo filme.
   */
  async create(movieDto: CreateMovieDto) {
    return this.prismaService.movie.create({ data: movieDto });
  }

  /**
   * Busca por todos os filmes.
   */
  async get() {
    return this.prismaService.movie.findMany();
  }
}
