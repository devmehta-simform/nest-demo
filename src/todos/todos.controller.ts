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
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../decorators/user/user.decorator';
import { UserToken } from '../types/user-token';
import { Roles } from '../decorators/roles/roles.decorator';
import { UserRole } from '../types/user-role';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
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
  findOne(@Param('id', ParseIntPipe) id: number, @User() user: UserToken) {
    return this.todosService.findOne(id, user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @User() user: UserToken,
  ) {
    if (!Object.keys(updateTodoDto).length) throw new BadRequestException();
    return this.todosService.update(id, updateTodoDto, user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user: UserToken) {
    return this.todosService.remove(id, user);
  }
}
