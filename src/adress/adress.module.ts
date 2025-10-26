import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AdressService } from './adress.service';
import { AdressController } from './adress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';
import { Exists_Address_Middleware } from '../middlewares/exists_address.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Adress])],
  controllers: [AdressController],
  providers: [AdressService],
})
export class AdressModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Exists_Address_Middleware).forRoutes(
      {
        path: 'address/find_by_id/:id',
        method: RequestMethod.GET,
      },
      {
        path: 'address/update_address/:id',
        method: RequestMethod.PATCH,
      },
    );
  }
}
