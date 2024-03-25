import { Expose } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsPositive, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateOrderDetailDto {
    @Expose()
    @IsPositive()
    order_id: number;

    @Expose()
    @IsPositive()
    productId: number;

    @Expose()
    @IsPositive()
    quantity: number;

    @Expose()
    @IsPositive()
    @Min(0.01)
    @Max(99999999.99)
    unitPrice: number;
    
}
