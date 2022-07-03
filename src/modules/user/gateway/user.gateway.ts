import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtPayloadParameter } from '../../auth/models';
import { JwtStrategy } from '../../auth/strategy';
import { UserEntity } from '../entity';
import { extractFromBase64 } from '../../../core/utils';

@WebSocketGateway()
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtStrategy: JwtStrategy,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async handleDisconnect(client: Socket) {
    const payload: JwtPayloadParameter = extractFromBase64(client);
    const user = await this.jwtStrategy.validate(payload);

    await this.userRepository.save({
      ...user,
      isOnline: false,
    });
  }

  async handleConnection(client: Socket, ...args) {
    const payload: JwtPayloadParameter = extractFromBase64(client);

    const user = await this.jwtStrategy.validate(payload);

    if (user) {
      await this.userRepository.save({
        ...user,
        isOnline: true,
      });
    } else {
      client.disconnect();
    }
  }
  @SubscribeMessage('messageToClient')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
