import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// nombre de la tabla: 
@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    user_id:number;

    @Column()
    user_name: string;

    @Column()
    user_lastname: string;

    @Column()
    user_phoneNumber: string;

    @Column()
    user_address: string;

    @Column()
    user_identificationNumber: string;

    @Column({unique:true})
    user_email: string;

    @Column()
    user_password: string;

    @Column({type: "datetime", default: ()=> "CURRENT_TIMESTAMP"})
    user_createdAt: Date;

}
