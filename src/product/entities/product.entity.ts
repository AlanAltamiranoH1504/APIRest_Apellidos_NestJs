import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id_product: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name_product: string;

  @Column({ type: 'varchar', nullable: true })
  description_product: string;

  @Column({ type: 'double', nullable: false })
  price: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'int', nullable: false, default: 1 })
  quantity: number;
}
