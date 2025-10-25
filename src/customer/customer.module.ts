import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { PasswordService } from '../auth/password/password.service';
import { Exists_Customer_Middleware } from '../middlewares/exists_customer.middleware';
import { Adress } from '../adress/entities/adress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Adress])],
  controllers: [CustomerController],
  providers: [CustomerService, PasswordService],
})
export class CustomerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Exists_Customer_Middleware).forRoutes(
      {
        path: 'customer/delete_customer/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: 'customer/find_customer/:id',
        method: RequestMethod.GET,
      },
      {
        path: 'customer/update_customer/:id',
        method: RequestMethod.PATCH,
      },
    );
    // consumer.apply(Email_In_Use_Middleware).forRoutes({
    //   path: 'customer/update_customer/:id',
    //   method: RequestMethod.PATCH,
    // });
  }
}
