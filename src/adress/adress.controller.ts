import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdressService } from './adress.service';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';

@Controller('address')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @Post()
  create(@Body() createAdressDto: CreateAdressDto) {
    return this.adressService.create(createAdressDto);
  }

  @Get('/find_all')
  findAll() {
    return this.adressService.findAll();
  }

  @Get('/find_by_id/:id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.adressService.findOne(+id);
  }

  @Patch('/update_address/:id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateAdressDto: UpdateAdressDto,
  ) {
    return this.adressService.update(+id, updateAdressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adressService.remove(+id);
  }
}
