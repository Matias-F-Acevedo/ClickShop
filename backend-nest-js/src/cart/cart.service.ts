import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from 'src/product/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async createCart(userId: number): Promise<Cart> {
    const newCart = this.cartRepository.create({ userId});
    const savedCart = await this.cartRepository.save(newCart);
    return savedCart;
  }
  

  async getCarts() {
    try {
      // Buscar todos los carritos e incluir la relación 'user' en cada uno
      const carts = await this.cartRepository.find({ relations: ["user", "products"] });
      
      if (!carts.length) {
        throw new NotFoundException('No carts found');
      }
      
      return carts;
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }  

  async getCartById(id: number) {
    // Buscar el carrito por su ID
    const cart = await this.cartRepository.findOne({ where: { id }, relations:[ "user", "products"]});
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    cart.totalPrice = this.calculateTotalPrice(cart);
    return cart;
  }

  async updateCart(userId: number, newProductId: number): Promise<Cart> {
    try {
      // Buscar el carrito por el ID del usuario
      const cart = await this.cartRepository.findOne({ where: { userId }, relations: ["user", "products"] });

      if (!cart) {
        throw new NotFoundException('Cart not found');
      }

      // Buscar el nuevo producto por su ID
      const newProduct = await this.productRepository.findOne({ where: { id: newProductId } });

      if (!newProduct) {
        throw new NotFoundException('Product not found');
      }
      // Agregar el nuevo producto al array de productos del carrito
      cart.products.push(newProduct);
      cart.totalPrice = this.calculateTotalPrice(cart);
      // Guardar los cambios
      await this.cartRepository.save(cart);

      return cart;
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }  
  private calculateTotalPrice(cart: Cart): number {
    // Calcular el precio total sumando los precios de todos los productos en el carrito
    return cart.products.reduce((total, product) => total + product.price, 0);
  }

  async deleteCart(id: number) {
    // Buscar el carrito por su ID
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
  
    // Eliminar el carrito
    return this.cartRepository.remove(cart);
  }
}
