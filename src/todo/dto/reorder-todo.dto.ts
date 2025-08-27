import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class ReorderTodoDto {
  @IsArray()
  @ApiProperty({ type: [Number] })
  ids: number[];
}
