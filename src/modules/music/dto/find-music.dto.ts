import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class FindMusicDto {
    @IsString()
    name: string;

    @IsInt()
    @Min(1)
    @Max(1000)
    pageNo: number;

    @IsInt()
    @Min(1)
    @Max(100)
    pageSize: number;
}
