import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const isProduction = process.env.NODE_ENV == 'production';

export default {
  default: {
    type: 'mysql',
    name: 'default',
    host: process.env.MYSQL_DEFAULT_HOST,
    username: process.env.MYSQL_DEFAULT_USERNAME,
    password: process.env.MYSQL_DEFAULT_PASSWORD,
    database: process.env.MYSQL_DEFAULT_DATABASE,
    port: process.env.MYSQL_DEFAULT_PORT || 3306,
    entities: ['dist/entities/*{.ts,.js}'],
    synchronize: true,
    logging: isProduction ? ['error', 'warn'] : true,
    maxQueryExecutionTime: 1000,
    logger: 'simple-console',
  } as TypeOrmModuleOptions,
};
