import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from 'dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createProduct(product: CreateProductDto) {
    const productFound = await this.productRepository.findOne({
      where: { name: product.name },
    });
    if (productFound) {
      return new HttpException('Product already exists', HttpStatus.CONFLICT);
    }
    const newProduct = this.productRepository.create(product)
    return this.productRepository.save(newProduct)
  }

  getProducts(){
    return this.productRepository.find()
  }
}