import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { hashPassword } from '../utils';
import { generateToken } from '../token';

@Injectable()
export class AuthService {
  constructor(@Inject('DB') private readonly db: any) {}

  async signup(email: string, password: string) {
    try {
      const hashed = hashPassword(password);

      await this.db.query(
        'INSERT INTO users(email, password) VALUES($1, $2)',
        [email, hashed]
      );

      return { message: 'User created successfully' };
    } catch (err) {
      // 👇 THIS IS THE IMPORTANT PART
      if (err.code === '23505') {
        throw new BadRequestException('Email already exists');
      }
      throw err;
    }
  }

  async login(email: string, password: string) {
    const result = await this.db.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );

    if (result.rows.length === 0) {
      throw new BadRequestException('User not found');
    }

    const user = result.rows[0];
    const hashed = hashPassword(password);

    if (user.password !== hashed) {
      throw new BadRequestException('Invalid password');
    }

    const accessToken = generateToken();
    const refreshToken = generateToken();

    await this.db.query(
      'UPDATE users SET refresh_token=$1 WHERE id=$2',
      [refreshToken, user.id]
    );

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const result = await this.db.query(
      'SELECT * FROM users WHERE refresh_token=$1',
      [refreshToken]
    );

    if (result.rows.length === 0) {
      throw new BadRequestException('Invalid refresh token');
    }

    const newAccessToken = generateToken();
    return { accessToken: newAccessToken };
  }
}
