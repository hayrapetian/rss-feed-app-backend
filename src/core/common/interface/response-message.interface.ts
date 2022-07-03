import { HttpStatus } from '@nestjs/common';

export interface ResponseMessage {
  message: string;
  status: HttpStatus;
}
