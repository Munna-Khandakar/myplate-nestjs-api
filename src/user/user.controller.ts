import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User as UserDec } from './user.decorator';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() body: { username: string; password: string },
  ): Promise<{ message: string }> {
    const { username, password } = body;
    await this.userService.registerUser({ username, password });
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async loginUser(
    @Body() body: CreateUserDto,
  ): Promise<{ message: string; token: string }> {
    const { username, password } = body;
    const token = await this.userService.loginUser({ username, password });
    return { message: 'Login successful', token };
  }

  @Get('users')
  @UseGuards(AuthGuard)
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('users/me')
  @UseGuards(AuthGuard)
  async getMe(@UserDec() user): Promise<User> {
    return this.userService.getMe(user?.userId);
  }
}
