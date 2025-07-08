import { IsInt, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: '页码必须是整数' })
    @Min(1, { message: '页码不能小于 1' })
    pageNo: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: '每页数量必须是整数' })
    @Min(1, { message: '每页数量不能小于 1' })
    pageSize: number = 10;
}
