import { Controller, Get, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { User } from '../../core/decorator';
import { UserEntity } from './entity';

@UseGuards(JwtGuard)
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('feed')
  private getUserFeed(@User() user: UserEntity) {
    return this.userService.getUserFeed(user);
  }
}
