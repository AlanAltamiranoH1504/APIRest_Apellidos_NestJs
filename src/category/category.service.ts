import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly category_respository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const name_in_use = await this.category_respository.findOne({
      where: {
        name_category: createCategoryDto.name_category,
      },
    });
    if (name_in_use) {
      throw new HttpException(
        'El nombre de la categoria ya se encuentra registrado',
        HttpStatus.CONFLICT,
      );
    }
    await this.category_respository.save(createCategoryDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Categoria creada correctamente',
    };
  }

  async findAll() {
    const categories = await this.category_respository.find({
      where: {
        status: true,
      },
    });
    if (categories.length === 0) {
      throw new HttpException(
        'No se encuentran categorias disponibles o estan deshabilitadas',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: true,
      categories,
      total: categories.length,
    };
  }

  async findOne(id: number) {
    const category_to_show = await this.category_respository.findOne({
      where: {
        id: id,
      },
    });
    if (!category_to_show) {
      throw new HttpException('Categoria no registrada', HttpStatus.NOT_FOUND);
    }
    if (!category_to_show.status) {
      throw new HttpException('Categoria deshabilitada', HttpStatus.CONFLICT);
    }

    return {
      status: true,
      category: category_to_show,
    };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category_to_update = await this.category_respository.findOne({
      where: {
        id: id,
      },
    });
    if (!category_to_update) {
      throw new HttpException(
        'La categoria no se encuentra registrada',
        HttpStatus.NOT_FOUND,
      );
    }
    const name_in_use = await this.category_respository.findOne({
      where: {
        name_category: updateCategoryDto.name_category,
      },
    });
    if (name_in_use && name_in_use.id !== id) {
      throw new HttpException(
        'El nombre de la categoria ya se encuentra en uso',
        HttpStatus.CONFLICT,
      );
    }
    // * Actualizacion de la categoria
    Object.assign(category_to_update, updateCategoryDto);
    await this.category_respository.save(category_to_update);
    return {
      status: true,
      message: 'Categoria actualizada correctamente',
    };
  }

  async remove(id: number) {
    const category_to_delete = await this.category_respository.findOne({
      where: {
        id: id,
      },
    });
    if (!category_to_delete) {
      throw new HttpException(
        'Categoria no registrada en la base de datos',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!category_to_delete.status) {
      throw new HttpException(
        'Categoria deshabilitada actualmente',
        HttpStatus.NOT_FOUND,
      );
    }
    category_to_delete.status = false;
    await this.category_respository.save(category_to_delete);
    return {
      status: true,
      message: 'Categoria eliminada correctamente',
    };
  }
}
