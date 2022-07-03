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
  //get news feed for initial request. every time user is logged in. after this should be connected to socket.
  private getUserFeed(@User() user: UserEntity) {
    return this.userService.getUserFeed(user);
  }

  //guess remove add edit keyword routes should be implemented here as well.
  // there should be table for keyword with id and userIDs who interested in it.
}
