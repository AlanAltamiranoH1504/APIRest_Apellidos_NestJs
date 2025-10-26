import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdressService {
  constructor(
    @InjectRepository(Adress)
    private readonly addresRepository: Repository<Adress>,
  ) {}

  create(createAdressDto: CreateAdressDto) {
    return 'This action adds a new adress';
  }

  async findAll() {
    const address = await this.addresRepository.find({
      relations: ['customer'],
    });
    if (address.length === 0) {
      throw new HttpException(
        'No existen direcciones guardadas',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      address,
      total: address.length,
    };
  }

  async findOne(id: number) {
    const address_to_show = await this.addresRepository.findOne({
      where: {
        id_address: id,
      },
      relations: ['customer'],
    });
    return {
      status: true,
      address: address_to_show,
    };
  }

  async update(id: number, updateAdressDto: UpdateAdressDto) {
    const addres_to_update = await this.addresRepository.findOne({
      where: {
        id_address: id,
      },
    });
    Object.assign(addres_to_update!, updateAdressDto);
    await this.addresRepository.save(addres_to_update!);
    return {
      status: true,
      message: 'Direccion actualizada correctamente',
    };
  }

  remove(id: number) {
    return `This action removes a #${id} adress`;
  }
}
