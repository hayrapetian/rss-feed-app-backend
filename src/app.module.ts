import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

//modules
import { NewsModule } from './modules/news/news.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
//orm config
import { config } from '../ormconfig';
import { KeywordModule } from './modules/keyword/keyword.module';

const thirdPartyModules: (
  | DynamicModule
  | Type<any>
  | Promise<DynamicModule>
  | ForwardReference<any>
)[] = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot(config),
  ScheduleModule.forRoot(),
];

@Module({
  imports: [...thirdPartyModules, NewsModule, UserModule, AuthModule, KeywordModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
