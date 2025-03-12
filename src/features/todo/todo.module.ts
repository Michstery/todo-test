import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PrismaService } from '../../prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
    }),
  ],
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
})
export class TodoModule {}