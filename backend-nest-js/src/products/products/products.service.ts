import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private productRepository: Repository<Products>,
    ) {}

  async createProduct(product: CreateProductDto) {
    const productFound = await this.productRepository.findOne({ 
      where : {product_name: product.product_name},
    });
    if (productFound){
    return new HttpException( 'Este producto ya existe', HttpStatus.CONFLICT);
    }
    const newProduct = this.productRepository.create(product)
    return this.productRepository.save(newProduct)
  }

  findAllProduct(): Promise<Products[]> {
    return this.productRepository.find()
  }

  async findOne(id_prod: number): Promise <HttpException | Products> {
  const product = await this.productRepository.findOne({
    where: {id_prod: id_prod},
   })
   if(!product){
     return new HttpException("El producto no existe", HttpStatus.NOT_FOUND)
    }
    return product
  }

  async updateProduct(id_prod: number, updateProductDto: Partial <UpdateProductDto>): Promise<HttpException | Products> {
    const product = await this.productRepository.findOne({where: {id_prod: id_prod}})
    if(!product){
      return new HttpException("Producto no existe", HttpStatus.NOT_FOUND)
        }
        this.productRepository.update(id_prod, updateProductDto)
        return{...product, ...updateProductDto}
  }

  async removeProduct(id_prod: number): Promise<HttpException | Products> {
    const product = await this.productRepository.findOne({where: {id_prod:id_prod}})
    if (!product){
      return new HttpException("El producto no existe", HttpStatus.NOT_FOUND)
    }
    this.productRepository.delete(id_prod)
    return product
  }  
}
