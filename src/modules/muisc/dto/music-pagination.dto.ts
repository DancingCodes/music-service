import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class MusicPaginationDto extends PaginationDto {
    @IsOptional()
    @IsString({ message: '歌曲名称必须是字符串' })
    name: string = '';
}
