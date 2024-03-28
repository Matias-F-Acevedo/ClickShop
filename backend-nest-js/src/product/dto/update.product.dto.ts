import { IsString, IsNumber, Min, IsOptional, MaxLength } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class UpdateProductDto {

  @IsOptional() // El campo es opcional
  @IsString()
  @MaxLength(15) // Establece la longitud máxima del nombre
  name?: string;

  @IsOptional() // El campo es opcional
  @IsNumber()
  @Min(0) // La cantidad debe ser mayor o igual a cero
  quantity?: number;

  @IsOptional() // El campo es opcional
  @IsNumber()
  @Min(0) // El precio debe ser mayor o igual a cero
  price?: number;

  @IsOptional() // El campo es opcional
  @IsString()
  description?: string;

  @IsOptional()
  category?: number;

}
