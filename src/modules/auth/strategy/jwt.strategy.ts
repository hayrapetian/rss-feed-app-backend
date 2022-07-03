import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JwtPayloadParameter } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  public async validate(payload: JwtPayloadParameter): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        id: payload.sub,
      },
      select: {
        id: true,
        username: true,
        isOnline: true,
      },
    });

    return user;
  }
}
