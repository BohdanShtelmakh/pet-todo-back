import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Public } from 'src/decorators/public.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: RegisterDto,
  ): Promise<{ success: boolean; access_token: string; user: User }> {
    const { token, user } = await this.authService.register(createUserDto);

    return {
      success: true,
      access_token: token,
      user,
    };
  }

  @Post('login')
  public async login(
    @Body() loginUserDto: LoginDto,
  ): Promise<{ success: boolean; access_token: string; user: User }> {
    const { token, user } = await this.authService.login(loginUserDto);

    return {
      success: true,
      access_token: token,
      user,
    };
  }
}
