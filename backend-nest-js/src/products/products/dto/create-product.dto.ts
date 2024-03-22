import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, isNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateProductDto {
   

   @Expose()
   @IsNotEmpty()
   @IsString()
   @MinLength(3)
   @MaxLength(35)
   product_name: string;

   @Expose()   
   @IsString()
   @MinLength(5)
   @MaxLength(255)
   descripcion: string;

   @Expose()
   @IsNotEmpty()
   @IsNumber()
   precio: number;

   @Expose()
   @IsString()
   @MinLength(4)
   @MaxLength(20)
   categoria:string;


}

