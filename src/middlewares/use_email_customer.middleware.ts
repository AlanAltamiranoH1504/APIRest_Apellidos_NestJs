import { Request, Response, NextFunction } from 'express';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Email_In_Use_Middleware implements NestMiddleware {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id_customer = req.params.id;
    const email_request: string = (req.body as { email_customer: string })
      .email_customer;

    if (!id_customer) {
      throw new HttpException(
        'El id del usuario es obligatorio',
        HttpStatus.CONFLICT,
      );
    }

    const email_in_use = await this.customerRepository.findOne({
      where: {
        email_customer: email_request,
        status: true,
      },
    });
    if (email_in_use && email_in_use.id_customer !== +id_customer) {
      throw new HttpException(
        'El email ya se encuentra en uso. No puede ser actualizado',
        HttpStatus.CONFLICT,
      );
    }
    next();
  }
}
