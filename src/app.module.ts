import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { TodoModule } from './features/todo/todo.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, TodoModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
