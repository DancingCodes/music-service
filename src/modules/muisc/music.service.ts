import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Music, MusicDocument } from './schemas/music.schema';
import { paginate } from 'src/utils/pagination';
import { fetchMusicById } from './utils/fetch-music';
import { fetchWyMusicList } from './utils/api';
import { ConfigService } from '@nestjs/config';
import { musicFileStaticRoot } from './constants';
import { findOne } from 'src/utils/findOne';

@Injectable()
export class MusicService {
    constructor(
        @InjectModel(Music.name) private readonly musicModel: Model<MusicDocument>,
        private configService: ConfigService
    ) { }

    async list(name: string, pageNo: number, pageSize: number) {
        const filter = name
            ? { name: { $regex: name, $options: 'i' } }
            : {};
        return paginate(this.musicModel, pageNo, pageSize, filter);
    }

    async wyList(name: string, pageNo: number, pageSize: number) {
        return fetchWyMusicList(name, pageNo, pageSize)
    }

    async create(id: number) {
        const exists = await findOne(this.musicModel, { id })
        if (exists) return exists;


        const WY_COOKIE = this.configService.get('WY_COOKIE')
        const musicStaticBase = this.configService.get('MUSIC_STATIC_BASE')
        const { song, lyric, fileName } = await fetchMusicById(id, WY_COOKIE);

        await this.musicModel.create({
            id: song.id,
            name: song.name,
            picUrl: song.al.picUrl,
            artists: song.ar.map((a: any) => ({ id: a.id, name: a.name })),
            duration: song.dt,
            lyric,
            url: `${musicStaticBase}${musicFileStaticRoot}/${fileName}`
        });

        return await findOne(this.musicModel, { id })
    }
}
