import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { OrderDetailsModule } from './order-details/order-details.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"mysql",
      host:"localhost",
      username:"root",
      password:"root",
      port:3306,
      database:"db_clickshop",
      entities:[__dirname + "/**/*.entity{.ts,.js}"],
      synchronize:true,
    }),
    OrderModule,
    OrderDetailsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
