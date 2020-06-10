import { Controller, Get, Post, Req, Request, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Live } from './live.model';
import { request } from 'http';

@Controller('lives')
export class LivesController {
  constructor(
    @InjectRepository(Live)
    private readonly liveRepository: Repository<Live>,
  ) {}

  @Get()
  async index() {
    return await this.liveRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  @Post()
  async store(@Req() request, Request) {
    const live = this.liveRepository.create(request.body as any);
    await this.liveRepository.save(live);
    return live;
  }

  @Get(':slug')
  async show(@Param('slug') slug) {
    return await this.liveRepository.findOneOrFail({ where: { slug } });
  }
}
