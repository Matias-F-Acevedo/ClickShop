import { Cart } from 'src/cart/entities/cart.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 12 })
  username: string;

  @Column({ length: 13 })
  password: string;

  @OneToOne(() => Cart, cart => cart.user)
  @JoinColumn()
  cart: Cart;
}