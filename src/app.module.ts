import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { TodoModule } from './features/todo/todo.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make config globally available
    }),
    UserModule,
    TodoModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
