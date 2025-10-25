import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { StatusValidationPipe } from '../common/pipes/status-validation/status-validation.pipe';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/create_customer')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get('/find_all/:status')
  findAll(@Param('status', StatusValidationPipe) status: boolean) {
    return this.customerService.findAll(status);
  }

  @Get('/find_customer/:id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch('/update_customer/:id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete('/delete_customer/:id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.customerService.remove(+id);
  }
}
