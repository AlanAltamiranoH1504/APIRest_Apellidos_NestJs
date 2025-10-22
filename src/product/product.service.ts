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
    await this.productRepository.save(createProductDto);
    return {
      status: true,
      message: 'Producto agregado correctamente',
    };
  }

  async findAll() {
    const products = await this.productRepository.find({
      where: {
        status: true,
      },
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
        status: true,
      },
    });
    if (!product_to_update) {
      throw new HttpException(
        'Producto no registrado o deshabilitado',
        HttpStatus.NOT_FOUND,
      );
    }
    product_to_update.name_product = updateProductDto.name_product;
    product_to_update.description_product = updateProductDto.description_product
      ? updateProductDto.description_product
      : '';
    product_to_update.price = updateProductDto.price;
    product_to_update.quantity = updateProductDto.quantity;
    product_to_update.status = updateProductDto.status;
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
