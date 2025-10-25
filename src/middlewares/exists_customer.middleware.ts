import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Exists_Customer_Middleware implements NestMiddleware {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id_customer = req.params.id;
    if (!id_customer) {
      throw new HttpException(
        'El de usuario a buscar es obligatorio',
        HttpStatus.BAD_REQUEST,
      );
    }
    // * Busqueda de usuario en base de datos
    const user_to_found = await this.customerRepository.findOne({
      where: {
        id_customer: +id_customer,
        status: true,
      },
    });
    if (!user_to_found) {
      throw new HttpException(
        'El usuario no se encuentra registrado en la base de datos o esta deshabilitado',
        HttpStatus.NOT_FOUND,
      );
    }
    next();
  }
}
