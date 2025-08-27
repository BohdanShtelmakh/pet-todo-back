import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto';
import { Todo } from 'src/todo/entities/todo.entity';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';

export const filters: string[] = ['all', 'completed', 'active'];
export type FilterTodo = (typeof filters)[number];

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  public async create(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    todo.user = user;
    const maxIndex: { max: number | null } | undefined =
      await this.todoRepository
        .createQueryBuilder('todo')
        .select('MAX(todo.index)', 'max')
        .getRawOne();
    todo.index = (maxIndex?.max ?? -1) + 1;
    return this.todoRepository.save(todo);
  }

  public async findAll(
    user: User,
    search?: string,
    status?: FilterTodo,
  ): Promise<Todo[]> {
    const query = this.todoRepository.createQueryBuilder('todo');
    query.where({ user });
    if (search) {
      query.where('todo.title LIKE :search', { search: `%${search}%` });
    }
    switch (status) {
      case 'completed':
        query.andWhere('todo.completed = :completed', { completed: true });
        break;
      case 'active':
        query.andWhere('todo.completed = :completed', { completed: false });
        break;
    }
    return query.getMany();
  }

  public async findOne(id: number, user: User) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new HttpException(
        `Todo with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (todo.user.id !== user.id) {
      throw new HttpException(
        `You do not have permission to access this todo`,
        HttpStatus.FORBIDDEN,
      );
    }
    return todo;
  }

  public async reorder(
    user: User,
    reorderTodoDto: { ids: number[] },
  ): Promise<Todo[]> {
    const { ids } = reorderTodoDto;

    const todos = await this.todoRepository.findBy({ id: In(ids), user });
    if (!todos || todos.length !== ids.length) {
      throw new HttpException(`Some todos not found`, HttpStatus.NOT_FOUND);
    }

    await Promise.all(
      ids.map((id, index) => {
        const todo = todos.find((t) => t.id === id);
        if (todo) {
          todo.index = index;
          return this.todoRepository.save(todo);
        }
      }),
    );
    return await this.findAll(user);
  }

  public async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
    user: User,
  ): Promise<Todo | null> {
    let todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new HttpException(
        `Todo with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (todo.user.id !== user.id) {
      throw new HttpException(
        `You do not have permission to update this todo`,
        HttpStatus.FORBIDDEN,
      );
    }
    await this.todoRepository.update(id, updateTodoDto);
    todo = await this.todoRepository.findOneBy({ id });
    return todo;
  }

  public async remove(id: number, user: User): Promise<void> {
    const todo = await this.findOne(id, user);
    if (!todo) {
      throw new HttpException(
        `Todo with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (todo.user.id !== user.id) {
      throw new HttpException(
        `You do not have permission to delete this todo`,
        HttpStatus.FORBIDDEN,
      );
    }
    await this.todoRepository.delete(id);
  }
}
