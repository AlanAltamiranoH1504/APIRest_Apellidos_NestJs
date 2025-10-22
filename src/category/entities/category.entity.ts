import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, length: 255 })
  name_category: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  description_category: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
