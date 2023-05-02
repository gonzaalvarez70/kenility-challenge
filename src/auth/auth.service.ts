import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtDto } from './dto/jwt.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(loginUserDTO: LoginUserDto): Promise<JwtDto> {
    const user = await this.validateUser(
      loginUserDTO.username,
      loginUserDTO.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user._id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signup(signupUserDto: SignupUserDto): Promise<UserDocument> {
    const result = await this.userService.create(signupUserDto);
    return result;
  }
}
