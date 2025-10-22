import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create_product')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('/find_all')
  findAll() {
    return this.productService.findAll();
  }

  @Get('/find_product/:id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('/update_product/:id')
  update_product(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete('/delete_product/:id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.productService.remove(+id);
  }
}
