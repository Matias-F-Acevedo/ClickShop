import { Column,CreateDateColumn,Entity,PrimaryGeneratedColumn,UpdateDateColumn} from 'typeorm';
  
  @Entity('Publications')
  export class Publication{

    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', length: 55 })
    name: string;
  
    @Column({ type: 'text' })
    content: string;
  
    @Column({ default: 'ACTIVE', type: 'varchar', length: 8 })
    Status: string;
  
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
  }