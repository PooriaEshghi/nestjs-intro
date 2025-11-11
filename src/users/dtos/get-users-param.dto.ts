import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersParamDto {
  @ApiPropertyOptional({ description: 'Filter by user id', example: 1234 })
  @IsOptional()
  @Type(() => Number) // trasforma la query 'id=123' in number
  @IsInt()
  id?: number;        // <-- NON string
}
