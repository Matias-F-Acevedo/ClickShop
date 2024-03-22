import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, MaxLength } from 'class-validator';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(15) // Establece la longitud máxima del nombre
  name: string;

  @IsOptional() // El campo es opcional
  @IsNumber()
  @Min(0) // La cantidad debe ser mayor o igual a cero
  quantity?: number;

  @IsNumber()
  @Min(0) // El precio debe ser mayor o igual a cero
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

}
