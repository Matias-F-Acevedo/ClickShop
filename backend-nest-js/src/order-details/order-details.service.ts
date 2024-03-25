import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {

  constructor(@InjectRepository(OrderDetail) private orderDetailsRepository: Repository<OrderDetail>) { }


  async create(createOrderDetailsDto:  CreateOrderDetailDto){
    const newOrderDetails = this.orderDetailsRepository.create(createOrderDetailsDto);
    return this.orderDetailsRepository.save(newOrderDetails);
  }


  async findAll() {
    const ordersDetails = await this.orderDetailsRepository.find();
    return ordersDetails;
  }

  
  async findOne(id: number) {
    try {
      const orderDetails = await this.orderDetailsRepository.findOne({
        where: { id: id },
      });
      if (!orderDetails) {
        return new HttpException('OrderDetail does not exist', HttpStatus.NOT_FOUND);
      }
      return orderDetails;

    } catch (error) {

      return new HttpException('The provided ID parameter is invalid', HttpStatus.BAD_REQUEST);
    }

  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
