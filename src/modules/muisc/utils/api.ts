import axios from 'axios';

export async function fetchSongDetail(id: number) {
    const res = await axios.post(
        `https://music.163.com/api/v3/song/detail?id=${id}&c=[{id: ${id}}]`
    );
    return res.data?.songs?.[0];
}

export async function fetchLyric(id: number) {
    const res = await axios.post(
        `https://music.163.com/api/song/lyric?id=${id}&lv=-1&tv=-1`
    );
    return res.data?.lrc?.lyric || '';
}

export async function fetchMusicUrl(id: number, Cookie: string) {
    const res = await axios.post(
        `https://music.163.com/api/song/enhance/player/url/v1?encodeType=aac&ids=[${id}]&level=jymaster`,
        null,
        {
            headers: { Cookie }
        }
    );

    const url = res.data?.data?.[0]?.url
    if (!url) {
        return 'Cookie失效'
    }

    return url;
}

export async function fetchWyMusicList(name: string, pageNo: number, pageSize: number) {
    const { data } = await axios.post(`https://music.163.com/api/search/get/web?s=${name}&type=1&offset=${(pageNo - 1) * pageSize}&limit=${pageSize}`)
    const { songs: list, songCount: total } = data.result
    return { list, total }
}