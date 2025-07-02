import { IsInt } from 'class-validator';

export class CreateMusicDto {
    @IsInt()
    id: number;
}