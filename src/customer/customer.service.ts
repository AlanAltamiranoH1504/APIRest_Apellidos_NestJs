import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const email_in_use = await this.customerRepository.findOne({
      where: {
        email_customer: createCustomerDto.email_customer,
      },
    });
    if (email_in_use) {
      throw new HttpException(
        'El emaail ya se encuentra registrado en la base de datos',
        HttpStatus.CONFLICT,
      );
    }
    const password_hash = await bcrypt.hash(
      createCustomerDto.password_customer,
      10,
    );
    const customer_to_save = this.customerRepository.create({
      name_customer: createCustomerDto.name_customer,
      lastname_customer: createCustomerDto.lastname_customer
        ? createCustomerDto.lastname_customer
        : '',
      email_customer: createCustomerDto.email_customer,
      password_customer: password_hash,
    });
    await this.customerRepository.save(customer_to_save);
    return {
      status: true,
      message: 'Usuario registrado correctamente',
    };
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
