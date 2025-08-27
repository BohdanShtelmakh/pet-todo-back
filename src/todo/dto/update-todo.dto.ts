import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  @ApiProperty()
  title?: string;

  @IsOptional()
  @ApiProperty()
  completed?: boolean;

  @Expose({ name: 'due_date' })
  @IsOptional()
  @IsDate()
  @ApiProperty()
  dueDate?: Date;
}
