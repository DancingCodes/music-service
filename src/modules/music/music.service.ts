import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Music } from './schemas/music.schema';
import { CreateMusicDto } from './dto/create-music.dto';
import { FindMusicDto } from './dto/find-music.dto';
import axios from 'axios';
import Response from 'src/utils/Response';
import downLoadMusic from 'src/utils/downLoadMusic';
import { post, musicFileStaticRoot, domainName } from 'src/config';


@Injectable()
export class MusicService {
    // Cookie失效时，去网易云网页版登陆上VIP账号，然后打开控制台拿Cookie
    private WYCookie = 'NMTID=00Op5EbxTHGv2TOxUdemrdsz3KfO70AAAGUsIKAjg; _iuqxldmzr_=32; _ntes_nnid=5fd5b8348c2ec4838340bdd2522f0be9,1738128130568; _ntes_nuid=5fd5b8348c2ec4838340bdd2522f0be9; WEVNSM=1.0.0; WNMCID=ygilsf.1738128131013.01.0; WM_TID=4gs0DW5OpSJBAEAFEAOHJMtAxQnB5O3u; __snaker__id=ZIkYPUJLNglE6CNI; sDeviceId=YD-IHkgw3NVypRAQxVRRVaSMYpEhRiGAKuX; ntes_utid=tid._.6hklWoI9f7lEB0UFUVLXJN5ElAjGRG4j._.0; ntes_kaola_ad=1; __remember_me=true; hb_MA-BFF5-63705950A31C_source=www.yanhuangxueyuan.com; _clck=nj9w54%7C2%7Cftr%7C0%7C1883; _ga_PTGVM6PCHS=GS1.1.1740546857.1.0.1740546857.0.0.0; _ga=GA1.1.1600261470.1740546858; __csrf=0395f94c76f9a0aa602ee0a41e467b81; JSESSIONID-WYYY=bNk4%2BiWzq2BMGXT7u7MPal%2Fa5fYqMnbn1B5778jvT%2B9u8a5zQsWboFyrrkwKgecuPuyGNJ%2FzENm3smQT5cx5s59%2FimV8rMEeB3vvPSxVV%2FXc%5C00zPdzWYgukYVqQl307b3tPm3mtU8ai0FWMlT7ZiHGAJkEB7xDIqXgatZ9r50Btc1M%5C%3A1741075707339; WM_NI=zTN%2FrR%2BxnIs1XpsEVsAYrMw63IWTXrFX4kbqM6o02JwC3%2FIL41IVPlfROtsNhZrHY5W12KA0mLloJUlLfh7Oj63ljVEOMlWIXS5JP%2BNXi0zYJM401FQE8TliN951P1VnaHM%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6ee8cc66085b383adca4798b48ab3c55e869a9fadc742aab99ea7fc3d9694a2afd82af0fea7c3b92aba8c82d0f15ae9a8a2aaf23b9cb0bda6d5798387beaef63ef19799b5db7a8688fc8ce17b8feaa1d1b142b59dfdd0cc48f8ef87b7d368a68e8195f246ac86bea9dc3f95effeacc43caf94a490c95fb094aa89b645aaeafd8de95e8791838dd6439c8dfbabd3218e88a7d1f9538a93fcd1b44e939bf8b5ef638ee7fbd2d33b96b2afa9d037e2a3; gdxidpyhxdE=REPpk7rl9mcqy8v1xCzg0XBt2f%2ByIk3efzh3bXPMk4BqQigH6stMJGaNT15OeR71ZYWCy%2FV9ZdPpq5H%2BdGIx4dslAzy3TbUb6rmiC8sHSWXNXHqCdmGH4w9EImp9vkVHEVXYbohSh%2F%2FPSMhMAvHBlEgZ5ReSCUIlxj0YJAHs1reScGrp%3A1741074811878; MUSIC_U=0057F41C13859BF339AC555CFF2012D36E0635E17BF33D3756EA3C1424110D6263E8CBA736D9A5257A1FD65F2D4A60C4699782264DFA6319F004CE63D6260C527FB0C4248B33E9642C0BFF32612D08ED20B606985B245C30783BB149C7CC0BA62BB74202CD2212C21C454A8A2873744A7D9BAE56E047EEDC587EC40FBAC22D24DAD1537210D48AA9E6733F2DFA173A7759DDA3C5F7B288C45541C61A7A3D4EB1920CF9B51F83E41056A97F238D266CC3473397B05C7A85A569A477E00503DD3FA3E80BEC5CEFA188B204E9AF553EC553CA3F441CA998DCACB42A70E60EE15C250E65A25C44F681452411B5E69821185EF25794F92F73ED88A1B824B8D4949D035591B0EC1E8E199CE0CF57FE1B491F928C3AF79F3D745046E76C7EDBB3C3D55B9053ACDDF0062F5D1EC08A895D81F2ACB2D49F3DDBC9CAD99AB96BCF8C63F68D6C638591CCB2FC42753C8D07ACF9171DDE84B735A25A49C45725FA66C783039FCB; __csrf=070f0c5d9ef466222c5a81c70fc2f787'
    constructor(
        @InjectModel(Music.name) private musicModel: Model<Music>,
    ) { }
    // 查询音乐列表
    async getMusicList(findMusicDto: FindMusicDto): Promise<Response> {
        const { name, pageNo, pageSize } = findMusicDto;

        const [result] = await this.musicModel.aggregate([
            {
                $match: {
                    name: new RegExp(name.split('').join('\\s*'), 'i')
                }
            },
            {
                $sort: { _id: -1 }
            },
            {
                $facet: {
                    total: [{ $count: "count" }],
                    list: [{ $skip: (pageNo - 1) * pageSize }, { $limit: pageSize }, { $project: { _id: 0, __v: 0 } }],
                }
            }
        ]);
        const total = result.total[0]?.count || 0;
        const list = result.list;
        return Response.success({ list, total });
    }

    // 通过网易云查找音乐
    async getWyMusicList(findMusicDto: FindMusicDto): Promise<Response> {
        const { name, pageNo, pageSize } = findMusicDto;
        const { data } = await axios.post(`https://music.163.com/api/search/get/web?s=${name}&type=1&offset=${(pageNo - 1) * pageSize}&limit=${pageSize}`)
        const { songs: list, songCount: total } = data.result
        return Response.success({ list, total })
    }

    // 下载网易云音乐
    async saveWyMusic(createMusicDto: CreateMusicDto): Promise<Response> {
        const { id } = createMusicDto;
        if (await this.musicModel.findOne({ id })) {
            return Response.error('已有该音乐')
        }
        // 获取歌曲信息(vip歌曲通用)
        const musicInfo = await axios.post(`https://music.163.com/api/v3/song/detail?id=${id}&c=[{id: ${id}}]`)
        if (!musicInfo.data.songs.length) {
            return Response.error('不存在该音乐')
        }

        // 获取歌词(vip歌曲通用)
        const musicLyric = await axios.post(`https://music.163.com/api/song/lyric?id=${id}&lv=-1&tv=-1`)


        // 获取音乐播放链接(vip歌曲获取不到url,取VIP账号的Cookie)
        const musicUrl = await axios.post(`https://music.163.com/api/song/enhance/player/url/v1?encodeType=aac&ids=[${id}]&level=jymaster`, null, {
            headers: {
                'Cookie': this.WYCookie
            }
        })

        if (!musicUrl.data.data[0].url) {
            return Response.error('Cookie失效')
        }

        // 下载音乐
        const fileName = await downLoadMusic(musicUrl.data.data[0].url, musicInfo.data.songs[0].id)


        // 整合信息
        const song = musicInfo.data.songs[0]
        const newMusic = {
            id: song.id,
            name: song.name,
            picUrl: song.al.picUrl,
            artists: song.ar.map((i: { id: number, name: string }) => ({ id: i.id, name: i.name })),
            duration: song.dt,
            lyric: musicLyric.data.lrc.lyric,
            url: process.env.NODE_ENV === 'production' ? `${domainName}${musicFileStaticRoot}/${fileName}` : `http://127.0.0.1:${post}${musicFileStaticRoot}/${fileName}`
        }

        await this.musicModel.create(newMusic)
        return Response.success(newMusic)
    }
}

