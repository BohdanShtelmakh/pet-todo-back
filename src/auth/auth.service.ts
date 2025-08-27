import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from './../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signJwt(user: User): Promise<string> {
    return await this.jwtService.signAsync({ ...user });
  }

  public passwordCheck(user: User, password: string): boolean {
    return compareSync(password, user.password);
  }

  public async login(
    loginDto: LoginDto,
  ): Promise<{ user: User; token: string }> {
    const user = await this.userService.fetchByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isValid = this.passwordCheck(user, loginDto.password);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    const token = await this.signJwt({ ...user });
    return { user, token };
  }

  public async register(
    registerDto: RegisterDto,
  ): Promise<{ user: User; token: string }> {
    const password = hashSync(registerDto.password, 10);
    const user = await this.userService.create({ ...registerDto, password });
    const token = await this.signJwt(user);
    return { user, token };
  }
}
