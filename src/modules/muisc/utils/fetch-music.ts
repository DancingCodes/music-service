import { downloadMusic } from './download';
import { fetchSongDetail, fetchLyric, fetchMusicUrl } from './api';

export async function fetchMusicById(id: number, Cookie: string) {
    const song = await fetchSongDetail(id);
    const lyric = await fetchLyric(id);
    const url = await fetchMusicUrl(id, Cookie);
    const fileName = await downloadMusic(url, song.id);
    return { song, lyric, fileName }
}
