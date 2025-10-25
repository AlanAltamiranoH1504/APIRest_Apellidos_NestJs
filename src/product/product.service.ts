import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const name_in_use = await this.productRepository.findOne({
      where: {
        name_product: createProductDto.name_product,
      },
    });
    if (name_in_use) {
      throw new HttpException(
        `El nombre del producto '${createProductDto.name_product}' ya se encuentra en uso`,
        HttpStatus.CONFLICT,
      );
    }
    const product_to_save = this.productRepository.create({
      name_product: createProductDto.name_product,
      description_product: createProductDto.description_product,
      quantity: createProductDto.quantity,
      price: createProductDto.price,
      category: { id: Number(createProductDto.category) },
    });
    await this.productRepository.save(product_to_save);
    return {
      status: true,
      message: 'Producto agregado correctamente',
    };
  }

  async findAll(status: boolean) {
    const products = await this.productRepository.find({
      where: {
        status: status,
      },
      relations: ['category'],
    });
    if (products.length === 0) {
      throw new HttpException(
        'No existen productos registrados en la db',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      products,
      total: products.length,
    };
  }

  async findOne(id: number) {
    const product_to_show = await this.productRepository.findOne({
      where: {
        id_product: id,
        status: true,
      },
      relations: ['category'],
    });
    if (!product_to_show) {
      throw new HttpException(
        'Producto no registrado en la base de datos o deshabilitado',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      product: product_to_show,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product_to_update = await this.productRepository.findOne({
      where: {
        id_product: id,
      },
    });
    if (!product_to_update) {
      throw new HttpException(
        'Producto no registrado o deshabilitado',
        HttpStatus.NOT_FOUND,
      );
    }

    const name_product_in_use = await this.productRepository.findOne({
      where: {
        name_product: updateProductDto.name_product,
      },
    });
    if (name_product_in_use && name_product_in_use.id_product !== id) {
      throw new HttpException(
        'El nombre del producto ya se encuentra en uso',
        HttpStatus.CONFLICT,
      );
    }
    Object.assign(product_to_update, updateProductDto);
    await this.productRepository.save(product_to_update);

    return {
      status: true,
      message: 'Producto actualizado correctamente',
    };
  }

  async remove(id: number) {
    const product_to_delete = await this.productRepository.findOne({
      where: {
        id_product: id,
        status: true,
      },
    });
    if (!product_to_delete) {
      throw new HttpException(
        'El producto no esta registrado se encuentra deshabilitado',
        HttpStatus.NOT_FOUND,
      );
    }
    product_to_delete.status = false;
    await this.productRepository.save(product_to_delete);
    return {
      status: true,
      message: 'Producto eliminado correctamente',
    };
  }
}
