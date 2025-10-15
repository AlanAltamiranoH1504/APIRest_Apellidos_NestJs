import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApellidosService } from './apellidos.service';
import { CreateApellidoDto } from './dto/create-apellido.dto';
import { UpdateApellidoDto } from './dto/update-apellido.dto';

@Controller('apellidos')
export class ApellidosController {
  constructor(private readonly apellidosService: ApellidosService) {}

  @Post('/create_apellido')
  crate_apellido(@Body() createApellidoDto: CreateApellidoDto) {
    return this.apellidosService.create_apellido(createApellidoDto);
  }

  @Get('/types_apellidos')
  types_apellidos() {
    return this.apellidosService.types_apellidos();
  }

  @Get(':apellido')
  find_apellido(@Param('apellido') apellido: string) {
    return this.apellidosService.find_apellido(apellido);
  }

  @Patch('update_apellido')
  update_apellido(@Body() updateApellidosDto: UpdateApellidoDto) {
    return this.apellidosService.update_apellido(updateApellidosDto);
  }

  @Delete(':apellido')
  delete_apellido(@Param('apellido') apellido: string) {
    return this.apellidosService.delete_apellido(apellido);
  }

  @Delete()
  delete_apellidos() {
    return this.apellidosService.delete_apellidos();
  }
}
