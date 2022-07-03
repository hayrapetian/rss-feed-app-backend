import { NewsEntity } from '../../modules/news/entity';
import * as moment from 'moment';

export const newsFormatter = (news): Partial<NewsEntity> => ({
  title: news.title[0],
  description: news.description[0],
  link: news.link[0],
  pubDate: moment(news.pubDate[0]).toISOString(),
  keywords: news.category
    ? JSON.stringify(news.category?.map((c) => c._))
    : JSON.stringify(['']),
});
