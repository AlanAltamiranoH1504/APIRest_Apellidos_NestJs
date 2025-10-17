import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsNotEmpty({ message: 'El nombre del usuario es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  nombre: string;

  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  @IsString({ message: 'Los apellidos deben ser una cadena de texto' })
  apellidos: string;

  @IsNotEmpty({ message: 'El email del usuario es obligatorio' })
  @IsEmail({}, { message: 'Formato de email no valido' })
  email: string;

  @IsNotEmpty({ message: 'El password del usuario es obligatorio' })
  @IsString({ message: 'El password debe ser una cadena de caracteres' })
  @MinLength(6, { message: 'El password debe tener al menos 6 caracteres' })
  @Matches(/(?=.*[A-Z])/, {
    message: 'El password debe tener al menos una letra mayuscula',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'El password debe tener al menos una letra miniscula',
  })
  @Matches(/(?=.*\d)/, { message: 'El password debe tener al menos un numero' })
  @Matches(/(?=.*[@$!%*?&+])/, {
    message: 'El password debe tener al menos un caracter especial',
  })
  password: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @IsISO8601({}, { message: 'Formato de fecha no valido (yyy-mm-dd)' })
  fecha_nacimiento: Date;
}
