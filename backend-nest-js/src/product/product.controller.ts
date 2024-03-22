import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update.product.dto';
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


  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productService.updateProduct(id, updateProductDto);
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const deletedProduct = await this.productService.deleteProduct(id);
    if (!deletedProduct) {
      throw new NotFoundException('Product not found');
    }
    return deletedProduct;
  }
}
