import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtDto } from './dto/jwt.dto';
import { UserDocument } from '../users/schemas/user.schema';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  login(@Body() loginUserDTO: LoginUserDto): Promise<JwtDto> {
    return this.authService.login(loginUserDTO);
  }

  @Post('auth/signup')
  signup(@Body() signupUserDto: SignupUserDto): Promise<UserDocument> {
    return this.authService.signup(signupUserDto);
  }
}
