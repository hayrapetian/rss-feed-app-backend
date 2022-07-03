import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import * as xml2js from 'xml2js';
import { Repository } from 'typeorm';

import { NewsEntity } from './entity';
import { newsFormatter } from '../../core/utils';
import { ErrorMessageEnum } from '../../core/enum';
import { UserEntity } from '../user/entity';
import { KeywordEntity } from '../keyword/entity';

@Injectable()
export class NewsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(NewsEntity)
    private newsRepository: Repository<NewsEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(KeywordEntity)
    private keywordRepository: Repository<KeywordEntity>,
  ) {}
  private readonly logger = new Logger(NewsService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  public handleCron(): void {
    this.httpService
      .get(this.configService.get<string>('NEWS_RSS_BASE_URL'))
      .subscribe((res) => {
        xml2js.parseString(res.data, async (err: Error, result) => {
          if (err) {
            throw new HttpException(
              ErrorMessageEnum.SOMETHING_WENT_WRONG,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }

          const news = await this.newsRepository.find({
            order: { pubDate: 'DESC' },
          });

          if (!news.length) {
            return result.rss.channel[0].item.forEach((i) => {
              const news: Partial<NewsEntity> = newsFormatter(i);
              this.newsRepository.save(news);
            });
          }

          for (const i of result.rss.channel[0].item) {
            if (moment(i.pubDate[0]).diff(moment(news[0].pubDate)) > 0) {
              // const users: UserEntity[] = await this.userRepository.findBy({
              //   isOnline: true,
              // });

              // const keywords = users.map((user: UserEntity) => {
              //   return this.keywordRepository.findBy({
              //     userId: user.id,
              //   });
              // });
              const news: Partial<NewsEntity> = newsFormatter(i);
              await this.newsRepository.save(news);
            }
          }
        });
      });
    this.logger.debug('RSS feed fetch CRON job is executed');
  }
}
