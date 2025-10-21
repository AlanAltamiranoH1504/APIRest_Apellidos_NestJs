import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export const type_orm_config = (
  config_service: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: config_service.get<string>('DATA_BASE_HOST'),
  port: +config_service.get('DATABASE_PORT'),
  username: config_service.get('DATABASE_USER'),
  password: config_service.get('DATABASE_PASSWORD'),
  database: config_service.get('DATABASE_NAME'),
  autoLoadEntities: true,
  synchronize: true,
});
