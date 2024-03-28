import { Cart } from 'src/cart/entities/cart.entity';
import { Category } from 'src/category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';

@Entity({ name: 'products' }) // Nombre de la tabla en la base de datos
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  quantity: number;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => Category, category => category.product)
  category: Category;

  @ManyToMany(() => Cart, cart => cart.products)
  carts: Cart[];
}


