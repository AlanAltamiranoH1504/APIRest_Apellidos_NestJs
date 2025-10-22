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

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
