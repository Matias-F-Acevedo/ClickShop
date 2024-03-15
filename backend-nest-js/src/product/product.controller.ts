import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from 'dto/product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createproduct(@Body() newproduct: CreateProductDto) {
    return this.productService.createProduct(newproduct);
  }

  @Get()
  getproducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }
}