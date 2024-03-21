
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Products")
export class Products {

    @PrimaryGeneratedColumn()
    id_prod:number;

    @Column()
    product_name: string;

    @Column()
    descripcion: string;

    @Column()
   precio: number;

   @Column()
   categoria:string;
   
}


