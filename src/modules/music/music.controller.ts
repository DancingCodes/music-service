import { Controller, Post, Body } from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { FindMusicDto } from './dto/find-music.dto';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) { }
  // 查询音乐列表
  @Post('getMusicList')
  async getMusicList(@Body() findMusicDto: FindMusicDto) {
    return this.musicService.getMusicList(findMusicDto);
  }

  // 通过网易云查找音乐
  @Post('getWyMusicList')
  async getWyMusicList(@Body() findMusicDto: FindMusicDto) {
    return this.musicService.getWyMusicList(findMusicDto);
  }

  // 添加网易云音乐
  @Post('saveWyMusic')
  async saveWyMusic(@Body() createMusicDto: CreateMusicDto) {
    return this.musicService.saveWyMusic(createMusicDto);
  }
}