import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';


@Injectable()
export class OrderService {

  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) { }


  async create(createOrderDto: CreateOrderDto): Promise<HttpException | Order>{
    const newOrder = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(newOrder);
  }


  async findAll(): Promise<HttpException | Order[]> {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async findOne(id: number): Promise<HttpException | Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: { order_id: id },
      });
      if (!order) {
        return new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
      }
      return order;

    } catch (error) {

      return new HttpException('The provided ID parameter is invalid', HttpStatus.BAD_REQUEST);
    }

  }


  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<HttpException | Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: { order_id: id },
      });

      if (!order) {
        return new HttpException('The order does not exist', HttpStatus.CONFLICT);
      }
      this.orderRepository.update(id, updateOrderDto);
      return { ...order, ...updateOrderDto };

    } catch (error) {
      return new HttpException('The provided ID parameter is invalid', HttpStatus.BAD_REQUEST);
    }

  }

  async remove(id: number): Promise<HttpException | Order> {

    try {
      const order = await this.orderRepository.findOne({
        where: { order_id: id },
      });
      if (!order) {
        return new HttpException('The order does not exist', HttpStatus.NOT_FOUND);
      }
      this.orderRepository.delete({ order_id: id });
      return order;
  
    } catch (error) {
      return new HttpException('The provided ID parameter is invalid', HttpStatus.BAD_REQUEST);
    }
    
  }
}
