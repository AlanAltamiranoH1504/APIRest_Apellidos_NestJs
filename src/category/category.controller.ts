import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create_category')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('/find_all')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/find_category/:id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch('/update_category/:id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete('/delete_category/:id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.categoryService.remove(+id);
  }
}
