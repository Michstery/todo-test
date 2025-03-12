import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../../../prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Replace with env variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}