import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/user/entitys/user.entity';
import { Product } from 'src/product/product.entity';

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // Esta columna debería almacenar el ID del usuario que posee el carrito

  @OneToOne(() => User, user => user.cart)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'cart_products',
    joinColumn: {
      name: 'cartId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: 'id'
    }
  })
  products: Product[];

  @Column({ default: 0 })
  totalPrice: number;

  
} 
