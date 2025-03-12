import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { email, password: hashedPassword },
    });
  }

  async update(id: number, data: { email?: string; password?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}