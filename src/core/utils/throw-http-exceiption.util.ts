import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessageEnum } from '../enum';

export const throwHttpException = (
  message: ErrorMessageEnum,
  status: HttpStatus,
) => {
  throw new HttpException(message, status);
};
