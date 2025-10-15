import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApellidoDto {
  @IsString({ message: 'Los apellidos debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  apellidos: string;
}
