import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class OrderDetail {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    @Column()
    productId: number;

    @Column()
    quantity: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    unitPrice: number;
    
    @Column({type: 'decimal', precision: 10, scale: 2})
    subtotal: number;

    @BeforeInsert()
    @BeforeUpdate()
    calculateSubtotal() {
        if (this.quantity && this.unitPrice) {
            this.subtotal = this.quantity * this.unitPrice;
        } else {
            this.subtotal = 0; // Si falta información para calcular el subtotal, se asigna como 0 (nunca va a faltar, ya que lo voy a manejar por el metodo update(patch), en caso de actualizar y que mande una de las dos propiedades solamente).
        }
    }

}
