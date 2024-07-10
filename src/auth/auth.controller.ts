import { AuthService } from './auth.service';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() credential) {
    const user = await this.authService.signIn(credential);
    return user;
  }

  // @Post('register')
}
