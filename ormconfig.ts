import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: '123456',
  database: 'rss',
  // Entities to be loaded for this connection
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};
