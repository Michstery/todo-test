import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      this.logger.debug(`Attempting to validate user with email: ${email}`);
      const user = await this.userService.findOne(email.toLowerCase());
      
      if (!user) {
        this.logger.debug('User not found');
        return null;
      }

      this.logger.debug('User found, comparing passwords');
      const isPasswordValid = await bcrypt.compare(password, user.password);
      this.logger.debug(`Password valid: ${isPasswordValid}`);

      if (!isPasswordValid) {
        this.logger.debug('Invalid password');
        return null;
      }

      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      this.logger.error(`Error validating user: ${error.message}`);
      throw new UnauthorizedException('Error during authentication');
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.validateUser(email, password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { email: user.email, sub: user.id };
      return {
        message: "User Successfully logged In",
        user: payload,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error(`Login failed: ${error.message}`);
      throw error;
    }
  }

  async register(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new UnauthorizedException('All Fields Required, No Empty Fields');
      }

      const confirmuser = await this.userService.findOne(email.toLowerCase());
      if (confirmuser) {
        throw new UnauthorizedException('User Already Registered');
      }

      const user = await this.userService.create(email.toLowerCase(), password);
      const payload = { email: user.email, sub: user.id };

      return {
        message: "User Successfully Registered",
        user: payload,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`);
      throw error;
    }
  }
}