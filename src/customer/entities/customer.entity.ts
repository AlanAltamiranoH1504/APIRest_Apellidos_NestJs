import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id_customer: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name_customer: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastname_customer: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  email_customer: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password_customer: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
