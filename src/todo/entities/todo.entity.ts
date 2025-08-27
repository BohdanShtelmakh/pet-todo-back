import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  index: number;

  @Column({ default: false })
  @ApiProperty()
  completed: boolean;

  @Column({ type: 'timestamptz', name: 'due_date', nullable: true })
  @Expose({
    name: 'due_date',
  })
  @ApiProperty()
  dueDate?: Date;

  @CreateDateColumn()
  @Expose({
    name: 'created_at',
  })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @Expose({
    name: 'updated_at',
  })
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
