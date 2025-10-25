import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAdressDto {
  @IsNotEmpty({ message: 'La direccion es obligatoria' })
  @IsString({ message: 'La direccion debe ser una cadena de caracteres' })
  @Length(5, 150, {
    message: 'La longitud de la direccion es entre 5 y 150 caracteres',
  })
  address: string;

  @IsNotEmpty({ message: 'La colonia es obligatoria' })
  @IsString({ message: 'La colonia debe ser una cadena de caracteres' })
  @Length(2, 50, {
    message: 'La longitud de la colonia debe ser entre 2 y 50 caracteres',
  })
  neighborhood: string;

  @IsNotEmpty({ message: 'La ciudad es obligatoria' })
  @IsString({ message: 'La ciudad debe ser una cadena de caracteres' })
  @Length(3, 70, {
    message: 'La longitud de la ciudad es entre 3 y 70 caracteres',
  })
  city: string;

  @IsNotEmpty({ message: 'El codigo postal es obligatorio' })
  @IsInt({ message: 'El codigo postal debe ser un numero entero' })
  zip_code: number;
}
