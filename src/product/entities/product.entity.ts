import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

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

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
