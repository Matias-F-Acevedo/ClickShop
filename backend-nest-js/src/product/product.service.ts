import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update.product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) { }

  async createProduct(productDto: CreateProductDto) {
    // Validar si el nombre del producto ya existe
    const existingProduct = await this.productRepository.findOne({ where: { name: productDto.name } });
    if (existingProduct) {
      throw new HttpException('Product with this name already exists', HttpStatus.CONFLICT);
    }

    const newProduct = this.productRepository.create(productDto);
    return this.productRepository.save(newProduct);
  }

  async getProducts() {
    return this.productRepository.find({ relations: ['category'] });
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
        throw new NotFoundException('Product not found');
    }

    // Verificar y actualizar cada propiedad individualmente
    if (updateProductDto.name !== undefined) {
        product.name = updateProductDto.name;
    }
    if (updateProductDto.quantity !== undefined) {
        product.quantity = updateProductDto.quantity;
    }
    if (updateProductDto.price !== undefined) {
        product.price = updateProductDto.price;
    }
    if (updateProductDto.description !== undefined) {
        product.description = updateProductDto.description;
    }

    // Guardar los cambios en la base de datos
    return this.productRepository.save(product);
}


  async deleteProduct(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.productRepository.remove(product);
  }
}
