import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MusicService } from './music.service';
import { R } from 'src/common/utils/response';
import { CreateMusicDto } from './dto/create-music.dto';
import { MusicPaginationDto } from './dto/music-pagination.dto';

@Controller('music')
export class MusicController {
    constructor(private readonly musicService: MusicService) { }

    @Get()
    async list(@Query() pagination: MusicPaginationDto) {
        const { name, pageNo, pageSize } = pagination;
        const data = await this.musicService.list(name, pageNo, pageSize);
        return R.success(data);
    }

    @Get('wyList')
    async wyList(@Query() pagination: MusicPaginationDto) {
        const { name, pageNo, pageSize } = pagination;
        const data = await this.musicService.wyList(name, pageNo, pageSize);
        return R.success(data);
    }

    @Post()
    async create(@Body() dto: CreateMusicDto) {
        const music = await this.musicService.create(dto.id);
        return music ? R.success(music) : R.error('创建失败')
    }
}
