import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtResponse } from './models';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  private async signup(@Body() signupDto: AuthDto): Promise<JwtResponse> {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  private async signin(@Body() signinDto: AuthDto): Promise<JwtResponse> {
    return this.authService.signin(signinDto);
  }
}
