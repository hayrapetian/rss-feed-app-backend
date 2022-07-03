import { Socket } from 'socket.io';

import { JwtPayloadParameter } from '../../modules/auth/models';

export const extractFromBase64 = (client: Socket): JwtPayloadParameter => {
  const base64Payload = client.handshake.headers.authorization.split('.')[1];
  const payloadBuffer = Buffer.from(base64Payload, 'base64');
  const updatedJwtPayload: JwtPayloadParameter = JSON.parse(
    payloadBuffer.toString(),
  );
  return updatedJwtPayload;
};
