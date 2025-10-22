import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'El nombre de la categoria es obligatorio' })
  @IsString({
    message: 'El nombre de la categoria debe ser una cadena de texto',
  })
  name_category: string;

  @IsOptional()
  @IsString({
    message: 'La descripcion de la categoria debe ser una cadena de texto',
  })
  description_category: string;
}
