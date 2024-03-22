import { Product } from 'src/product/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'category' }) // Nombre de la tabla en la base de datos
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Product, (product) => product.category)
    product: Product


}
