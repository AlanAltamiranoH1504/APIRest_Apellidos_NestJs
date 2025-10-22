import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  @IsString({ message: 'El nombre del producto debe ser una cadena de texto' })
  name_product: string;

  @IsOptional()
  @IsString({
    message: 'La descripcion del producto debe ser una cadena de texto',
  })
  description_product: string;

  @IsNotEmpty({ message: 'El precio del producto es obligatorio' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe tener maximo 2 decimales' },
  )
  @IsPositive({ message: 'El precio debe ser positivo' })
  price: number;

  @IsNotEmpty({ message: 'El invetario inicial es obligatorio' })
  @IsInt({ message: 'El invetario inicial debe ser un numero entero' })
  @IsPositive({ message: 'El inventario inicial debe ser mayor a 0' })
  quantity: number;

  @IsNotEmpty({ message: 'El status del producto es obligatorio' })
  @IsBoolean({ message: 'El status del producto debe ser true o false' })
  status: boolean;
}
