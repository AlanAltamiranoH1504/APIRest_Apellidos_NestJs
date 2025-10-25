import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';

@Entity('tbl_address')
export class Adress {
  @PrimaryGeneratedColumn()
  id_address: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  neighborhood: string;

  @Column({ type: 'varchar', length: 70, nullable: false })
  city: string;

  @Column({ type: 'int', nullable: false })
  zip_code: number;

  // Una Direcciones Pertenece a un Usuariio
  @OneToOne(() => Customer, (customer) => customer.address)
  customer: Customer;
}
