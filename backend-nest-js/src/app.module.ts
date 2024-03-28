import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';


import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"mysql",
      host:"localhost",
      username:"root",
      password:"root",
      port:3306,
      database:"db_clickshop",
      migrations: ["./path-to-migrations-dir"],
      entities:[__dirname + "/**/*.entity{.ts,.js}"],
      synchronize:true,
    }),
    UserModule, ProductModule, CategoryModule, CartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

