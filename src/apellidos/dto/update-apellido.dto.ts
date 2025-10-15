import { PartialType } from '@nestjs/mapped-types';
import { CreateApellidoDto } from './create-apellido.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateApellidoDto extends PartialType(CreateApellidoDto) {
  @IsString({ message: 'Los apellidos nuevos debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'Los apellidos nuevos son obligatorios' })
  new_apellidos: string;

  @IsString({ message: 'Los apellidos viejos debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'Los apellidos viejos son obligatorios' })
  old_apellidos: string;
}
