import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, title: string) {
    return this.prisma.todo.create({
      data: { userId, title },
    });
  }

  async findAll(
    userId: number,
    filter: 'all' | 'completed' | 'uncompleted' = 'all',
  ) {
    const where = { userId };
    if (filter === 'completed') where['completed'] = true;
    if (filter === 'uncompleted') where['completed'] = false;

    return this.prisma.todo.findMany({
      where,
      orderBy: [
        { completed: 'asc' },
        { completedAt: { sort: 'asc', nulls: 'last' } },
        { createdAt: 'desc' },
      ],
    });
  }

  async update(id: number, userId: number, completed: boolean) {
    return this.prisma.todo.update({
      where: { id, userId },
      data: { completed, completedAt: completed ? new Date() : null },
    });
  }

  async delete(id: number, userId: number) {
    return this.prisma.todo.delete({ where: { id, userId } });
  }
}