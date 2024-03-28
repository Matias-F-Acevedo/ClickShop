import { IsNotEmpty, IsArray, IsOptional, isNotEmpty } from 'class-validator';
import { Product } from 'src/product/product.entity';

export class CreateCartDto {
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  productId: number;
}

