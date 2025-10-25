import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAdressDto } from '../../adress/dto/create-adress.dto';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'El nombre del cliente es obligatorio' })
  @IsString({ message: 'El nombre del cliente debe ser una cadena de texto' })
  name_customer: string;

  @IsOptional()
  @IsString({
    message: 'Los apellidos del cliente deben ser una cadena de texto',
  })
  lastname_customer: string;

  @IsNotEmpty({ message: 'El email del cliente es obligatorio' })
  @IsEmail({}, { message: 'El email del cliente no es valido' })
  email_customer: string;

  @IsNotEmpty({ message: 'El password del usuario es obligatorio' })
  @IsString({ message: 'El password del usuario debe ser una cadena de texto' })
  @Length(6, 100, {
    message: 'El password debe tener una longitud minima de 6 caracteres',
  })
  password_customer: string;

  // * Importacion de DTO de Adress dentro de Dto de Customer
  @IsNotEmptyObject(
    { nullable: false },
    { message: 'La direccion es obligatoria' },
  )
  @ValidateNested()
  @Type(() => CreateAdressDto)
  address: CreateAdressDto;
}
