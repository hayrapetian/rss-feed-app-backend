import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { KeywordEntity } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([KeywordEntity])],
  controllers: [KeywordController],
  providers: [KeywordService],
})
export class KeywordModule {}
