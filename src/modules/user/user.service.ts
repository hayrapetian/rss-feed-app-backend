import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entity';
import { KeywordEntity } from '../keyword/entity';
import { NewsEntity } from '../news/entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(KeywordEntity)
    private keywordRepository: Repository<KeywordEntity>,
    @InjectRepository(NewsEntity)
    private newsRepository: Repository<NewsEntity>,
  ) {}

  public async getUserFeed(user: UserEntity): Promise<NewsEntity[]> {
    const keywords = await this.keywordRepository.find({
      where: {
        userId: user.id,
      },
      select: {
        keyword: true,
      },
    });
    const news = await Promise.all(
      keywords.map(({ keyword }) => {
        return this.newsRepository
          .createQueryBuilder()
          .select()
          .where('keywords Ilike :searchTerm', {
            searchTerm: `%${keyword}%`,
          })
          .getMany();
      }),
    );
    return news.flat();
  }
}
