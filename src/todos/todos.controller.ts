import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../decorators/user/user.decorator';
import { UserToken } from '../types/user-token';
import { Roles } from '../decorators/roles/roles.decorator';
import { UserRole } from '../types/user-role';
@Roles(UserRole.ADMIN, UserRole.USER)
@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @User() user: UserToken) {
    return this.todosService.create(createTodoDto, user);
  }

  @Get()
  findAll(@User() user: UserToken) {
    return this.todosService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserToken) {
    return this.todosService.findOne(+id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @User() user: UserToken,
  ) {
    if (!Object.keys(updateTodoDto).length) throw new BadRequestException();
    return this.todosService.update(+id, updateTodoDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserToken) {
    return this.todosService.remove(+id, user);
  }
}
