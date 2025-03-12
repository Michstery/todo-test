import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { TodoService } from './todo.service';
  import { JwtAuthGuard } from '../user/auth/jwt.guard';
  
  @Controller('todos')
  @UseGuards(JwtAuthGuard)
  export class TodoController {
    constructor(private todoService: TodoService) {}
  
    @Post()
    create(@Request() req, @Body() body: { title: string }) {
      return this.todoService.create(req.user.userId, body.title);
    }
  
    @Get()
    findAll(
      @Request() req,
      @Query('filter') filter: 'all' | 'completed' | 'uncompleted' = 'all',
    ) {
      return this.todoService.findAll(req.user.userId, filter);
    }
  
    @Patch(':id')
    update(
      @Request() req,
      @Param('id') id: string,
      @Body() body: { completed: boolean },
    ) {
      return this.todoService.update(+id, req.user.userId, body.completed);
    }
  
    @Delete(':id')
    delete(@Request() req, @Param('id') id: string) {
      return this.todoService.delete(+id, req.user.userId);
    }
  }