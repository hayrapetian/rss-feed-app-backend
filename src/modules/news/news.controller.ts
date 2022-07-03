import { Controller } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('api/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
}
