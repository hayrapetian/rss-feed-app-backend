import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsEntity } from './entity';
import { UserEntity } from '../user/entity';
import { KeywordEntity } from '../keyword/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity, UserEntity, KeywordEntity]),
    HttpModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
