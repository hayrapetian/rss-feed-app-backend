import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { KeywordService } from './keyword.service';
import { KeywordDto } from './dto';
import { User } from '../../core/decorator';
import { JwtGuard } from '../auth/guard';
import { UserEntity } from '../user/entity';
import { ResponseMessage } from '../../core/common/interface';

@Controller('api/keyword')
@UseGuards(JwtGuard)
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Post()
  private addKeyword(
    @Body() addKeywordDto: KeywordDto,
    @User() user: UserEntity,
  ): Promise<ResponseMessage> {
    return this.keywordService.addKeyword(addKeywordDto, user);
  }

  @Delete(':id')
  private deleteKeyword(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ): Promise<ResponseMessage> {
    return this.keywordService.deleteKeyword(id, user);
  }

  @Patch(':id')
  private updateKeyword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateKeywordDto: KeywordDto,
    @User() user: UserEntity,
  ): Promise<ResponseMessage> {
    return this.keywordService.updateKeyword(id, updateKeywordDto, user);
  }
}
