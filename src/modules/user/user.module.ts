import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { NewsEntity } from '../news/entity';
import { KeywordEntity } from '../keyword/entity';
import { UserGateway } from './gateway';
import { JwtStrategy } from '../auth/strategy';
import { UserEntity } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity, KeywordEntity, UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserGateway, JwtService, JwtStrategy],
})
export class UserModule {}
