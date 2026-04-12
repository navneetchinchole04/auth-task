import { Controller, Post, Body, Res, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: any) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: any, @Res({ passthrough: true }) res: any) {
    const tokens = await this.authService.login(body.email, body.password);

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Logged in' };
  }

  @Post('refresh')
  async refresh(@Req() req: any, @Res({ passthrough: true }) res: any) {
    const refreshToken = req.cookies.refresh_token;

    const token = await this.authService.refresh(refreshToken);

    res.cookie('access_token', token.accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    return { message: 'Token refreshed' };
  }

  @Get('profile')
  async profile(@Req() req: any) {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      throw new Error('Not authenticated');
    }

    return { message: 'You are authenticated', token: accessToken };
  }
}