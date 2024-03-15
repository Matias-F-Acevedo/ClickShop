import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 12 })
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;
}