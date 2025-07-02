import * as fs from 'fs';
import axios from 'axios';
import * as path from 'path';
import { musicFilePath } from 'src/config';

// 下载音乐
async function downLoadMusic(url: string, id: number) {
    return new Promise(async (resolve, reject) => {
        try {
            // 查询是否已有文件夹
            if (!fs.existsSync(musicFilePath)) {
                fs.mkdirSync(musicFilePath, { recursive: true });
            }

            // 获取音乐文件流
            const response = await axios({
                url: url,
                method: 'GET',
                responseType: 'stream'
            });

            // 获取文件类型
            const fileType = path.extname(response.headers['content-disposition'].split('filename=')[1].slice(1, -1));
            // 设置文件名
            const fileName = `${id}${fileType}`;

            // 写入
            const writer = fs.createWriteStream(path.join(musicFilePath, fileName));
            response.data.pipe(writer);

            writer.on('finish', () => {
                resolve(fileName);
            });

            writer.on('error', (err) => {
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
}
export default downLoadMusic;