import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsService } from './news.service';
import { NewsEntity } from './entity';
import { UserEntity } from '../user/entity';
import { KeywordEntity } from '../keyword/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity, UserEntity, KeywordEntity]),
    HttpModule,
  ],
  providers: [NewsService],
})
export class NewsModule {}
