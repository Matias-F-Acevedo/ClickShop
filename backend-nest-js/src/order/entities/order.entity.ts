import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum OrderStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    SHIPPED = 'SHIPPED',
    CANCELLED = 'CANCELLED',
}

@Entity("order")
export class Order {

    @PrimaryGeneratedColumn()
    order_id: number;

    @Column()
    user_id: number;

    @Column()
    shippingAddress: string;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    // ejemplo de numero max: 99999999.99
    @Column({ type: 'decimal', precision: 10, scale: 2 }) 
    total: number;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    date: Date;
}
