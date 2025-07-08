import { IsInt } from 'class-validator';

export class CreateMusicDto {
    @IsInt({ message: '音乐 ID 必须是整数' })
    id: number;
}
