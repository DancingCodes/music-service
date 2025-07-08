import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { musicFilePath } from '../constants';

export async function downloadMusic(url: string, id: number) {
    // 确保目录存在
    if (!fs.existsSync(musicFilePath)) {
        fs.mkdirSync(musicFilePath, { recursive: true });
    }

    // 请求音乐文件流
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    // 获取文件类型
    const fileType = path.extname(response.headers['content-disposition'].split('filename=')[1].slice(1, -1));
    // 设置文件名
    const fileName = `${id}${fileType}`;

    // 创建写入流并写文件
    const writer = fs.createWriteStream(path.join(musicFilePath, fileName));
    response.data.pipe(writer);

    // 返回 Promise，写入完成时 resolve 文件名
    return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(fileName));
        writer.on('error', (err) => {
            writer.close();
            reject(err);
        });
    });
}
