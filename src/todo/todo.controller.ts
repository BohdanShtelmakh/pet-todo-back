import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';
import { Auth } from 'src/decorators/user.decorator';
import { ReorderTodoDto } from 'src/todo/dto/reorder-todo.dto';
import { Todo } from 'src/todo/entities/todo.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { filters, FilterTodo, TodoService } from './todo.service';

@Controller('todo')
@UseInterceptors(ClassSerializerInterceptor)
@ApiExtraModels(Todo)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOkResponse({
    description: 'Todo created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        todo: { type: 'object', $ref: getSchemaPath(Todo) },
      },
    },
  })
  public async create(
    @Body() createTodoDto: CreateTodoDto,
    @Auth() user: User,
  ): Promise<{ success: boolean; todo: Todo }> {
    console.log('Creating todo:', createTodoDto);

    const todo = await this.todoService.create(createTodoDto, user);
    return {
      success: true,
      todo,
    };
  }

  @Get()
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: filters,
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        todos: { type: 'array', items: { $ref: getSchemaPath(Todo) } },
      },
    },
  })
  public async findAll(
    @Auth() user: User,
    @Query('search') search?: string,
    @Query('status') status?: FilterTodo,
  ): Promise<{ success: boolean; todos: Todo[] }> {
    const todos = await this.todoService.findAll(user, search, status);
    return {
      success: true,
      todos,
    };
  }

  @Get(':id')
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        todo: { type: 'object', $ref: getSchemaPath(Todo) },
      },
    },
  })
  public async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Auth() user: User,
  ): Promise<{ success: boolean; todo: Todo }> {
    const todo = await this.todoService.findOne(id, user);
    return { success: true, todo };
  }

  @Post('reorder')
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        todos: { type: 'array', items: { $ref: getSchemaPath(Todo) } },
      },
    },
  })
  public async reorder(
    @Body() reorderTodoDto: ReorderTodoDto,
    @Auth() user: User,
  ): Promise<{ success: boolean; todos: Todo[] }> {
    const todos = await this.todoService.reorder(user, reorderTodoDto);
    return { success: true, todos };
  }

  @Patch(':id')
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        todo: { type: 'object', $ref: getSchemaPath(Todo), nullable: true },
      },
    },
  })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Auth() user: User,
  ): Promise<{ success: boolean; todo: Todo | null }> {
    const updatedTodo = await this.todoService.update(id, updateTodoDto, user);
    return {
      success: true,
      todo: updatedTodo,
    };
  }

  @Delete(':id')
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
      },
    },
  })
  public async remove(
    @Param('id', ParseIntPipe) id: number,
    @Auth() user: User,
  ): Promise<{ success: boolean }> {
    await this.todoService.remove(id, user);
    return {
      success: true,
    };
  }
}
