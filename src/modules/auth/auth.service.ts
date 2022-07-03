import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as argon from 'argon2';

import { AuthDto } from './dto';
import { JwtResponse } from './models';
import { UserEntity } from '../user/entity';
import { ErrorMessageEnum } from '../../core/enum';
import { throwHttpException } from '../../core/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async signup(signupDto: AuthDto): Promise<JwtResponse> {
    try {
      const userWithGivenCredentials = await this.userRepository.findOne({
        where: {
          username: signupDto.username,
        },
      });
      if (userWithGivenCredentials) {
        throwHttpException(
          ErrorMessageEnum.USER_ALREADY_EXISTS,
          HttpStatus.CONFLICT,
        );
      }
      const hash: string = await argon.hash(signupDto.password);

      const user: UserEntity = await this.userRepository.save({
        username: signupDto.username,
        password: hash,
        isOnline: true,
      } as UserEntity);

      return this.signToken(user.id, user.username);
    } catch (e) {
      throwHttpException(
        e.message ? e.message : ErrorMessageEnum.SIGN_UP_FAILED,
        e.status ? e.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async signin(signinDto: AuthDto): Promise<JwtResponse> {
    const user = await this.userRepository.findOne({
      where: {
        username: signinDto.username,
      },
    });

    if (!user) {
      throwHttpException(
        ErrorMessageEnum.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = await argon.verify(
      user.password,
      signinDto.password,
    );

    if (!isPasswordValid) {
      throwHttpException(
        ErrorMessageEnum.INVALID_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.signToken(user.id, user.username);
  }

  async signToken(id: number, username: string): Promise<JwtResponse> {
    const payloadToSign = {
      sub: id,
      username,
    };
    return {
      id,
      access_token: await this.jwtService.signAsync(payloadToSign, {
        expiresIn: '1d',
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }
}
