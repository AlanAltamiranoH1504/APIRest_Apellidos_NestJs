import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApellidosModule } from './apellidos/apellidos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type_orm_config } from './config/typeorm.config';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { PasswordService } from './auth/password/password.service';
import { AdressModule } from './adress/adress.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: type_orm_config,
      inject: [ConfigService],
    }),
    ApellidosModule,
    UsuariosModule,
    CategoryModule,
    ProductModule,
    CustomerModule,
    AdressModule,
  ],
  controllers: [AppController],
  providers: [AppService, PasswordService],
})
export class AppModule {}
