import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordEntity } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([KeywordEntity])],
  controllers: [KeywordController],
  providers: [KeywordService],
})
export class KeywordModule {}
