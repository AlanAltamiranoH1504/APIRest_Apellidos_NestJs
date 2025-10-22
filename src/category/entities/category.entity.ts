import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
