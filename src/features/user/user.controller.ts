import {
    Controller,
    Get,
    Patch,
    Body,
    UseGuards,
    Request,
    NotFoundException,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { JwtAuthGuard } from './auth/jwt.guard';
  
  @Controller('users')
  @UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    // Get the authenticated user's profile
    @Get('me')
    async getProfile(@Request() req) {
      const user = await this.userService.findOne(req.user.email);
      if (!user) throw new NotFoundException('User not found');
      const { password, ...result } = user; // Exclude password from response
      return result;
    }
  
    // Update the authenticated user's email or password
    @Patch('me')
    async updateProfile(
      @Request() req,
      @Body() body: { email?: string; password?: string },
    ) {
      const updateData: { email?: string; password?: string } = {};
      if (body.email) updateData.email = body.email;
      if (typeof body.password === 'string') {
        updateData.password = await import('bcrypt').then(bcrypt => bcrypt.hash(body.password!, 10));
      }
  
      const user = await this.userService.update(req.user.userId, updateData);
      const { password, ...result } = user; // Exclude password from response
      return result;
    }
  }