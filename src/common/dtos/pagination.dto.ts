import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    default: 10,
    description: 'How many rows will be displayed',
  })
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    default: 10,
    description: 'How many rows do you want to skip',
  })
  offset?: number;
}
