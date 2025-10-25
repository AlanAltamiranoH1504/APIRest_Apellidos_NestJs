import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { PasswordService } from '../auth/password/password.service';
import { Request } from 'express';
import { Adress } from '../adress/entities/adress.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Adress)
    private readonly addresRepository: Repository<Adress>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const email_in_use = await this.customerRepository.findOne({
      where: {
        email_customer: createCustomerDto.email_customer,
      },
    });
    if (email_in_use) {
      throw new HttpException(
        'El email ya se encuentra registrado en la base de datos',
        HttpStatus.CONFLICT,
      );
    }

    // * Creacion de address
    const address_to_save = await this.addresRepository.save(
      createCustomerDto.address,
    );

    const password_hash = await this.passwordService.hashPassword(
      createCustomerDto.password_customer,
    );
    const customer_to_save = this.customerRepository.create({
      name_customer: createCustomerDto.name_customer,
      lastname_customer: createCustomerDto.lastname_customer
        ? createCustomerDto.lastname_customer
        : '',
      email_customer: createCustomerDto.email_customer,
      password_customer: password_hash,
      address: address_to_save,
    });
    await this.customerRepository.save(customer_to_save);
    return {
      status: true,
      message: 'Usuario registrado correctamente',
    };
  }

  async findAll(status: boolean) {
    const customers = await this.customerRepository.find({
      where: {
        status: status,
      },
      select: [
        'id_customer',
        'name_customer',
        'lastname_customer',
        'email_customer',
        'status',
      ],
    });

    if (customers.length === 0) {
      return {
        status: false,
        message: 'No se encuentra usuarios disponibles',
      };
    }
    return {
      status: true,
      customers: customers,
      total: customers.length,
    };
  }

  async findOne(id: number) {
    const customer_to_show = await this.customerRepository.findOne({
      where: {
        id_customer: id,
      },
      select: [
        'name_customer',
        'lastname_customer',
        'email_customer',
        'status',
      ],
    });
    return {
      status: true,
      customer: customer_to_show,
    };
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const email_in_use = await this.customerRepository.findOne({
      where: {
        email_customer: updateCustomerDto.email_customer,
        status: true,
      },
    });
    if (email_in_use && email_in_use.id_customer !== +id) {
      throw new HttpException(
        'El email esta siendo utilizado por alguno otro usuario',
        HttpStatus.CONFLICT,
      );
    }
    const customer_to_update = await this.customerRepository.findOne({
      where: {
        id_customer: id,
      },
    });
    Object.assign(customer_to_update!, updateCustomerDto);
    await this.customerRepository.save(customer_to_update!);
    return {
      status: true,
      message: 'Usuario actualizado correctamente',
    };
  }

  async remove(id: number) {
    await this.customerRepository.update(
      {
        id_customer: id,
      },
      {
        status: false,
      },
    );
    return {
      status: true,
      message: 'Customer eliminado correctamente',
    };
  }
}
