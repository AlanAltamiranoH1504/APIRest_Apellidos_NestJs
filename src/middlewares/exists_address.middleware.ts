import { Request, Response, NextFunction } from 'express';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Adress } from '../adress/entities/adress.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Exists_Address_Middleware implements NestMiddleware {
  constructor(
    @InjectRepository(Adress)
    private readonly addressRepository: Repository<Adress>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const address_to_found = await this.addressRepository.findOne({
      where: { id_address: +req.params.id },
    });

    if (!address_to_found) {
      throw new HttpException(
        'La direccion no esta registrada en la base de datos',
        HttpStatus.NOT_FOUND,
      );
    }
    next();
  }
}
