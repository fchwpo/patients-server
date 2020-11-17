import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PATIENTS_INFO')
export class PatientsInfo extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID', unsigned: true })
  id: number;

  @Column('varchar', { name: 'NAME', length: 255 })
  name: string;

  @Column('tinyint', { name: 'AGE', unsigned: true })
  age: number;

  @Column('enum', { name: 'GENDER', enum: ['M', 'F', 'O'] })
  gender: 'M' | 'F' | 'O';

  @Column('varchar', { name: 'CONTACT', nullable: true, length: 50 })
  contact: string | null;

  @Column('varchar', { name: 'ADDRESS', nullable: true, length: 255 })
  address: string | null;

  @Column('varchar', { name: 'CITY', nullable: true, length: 50 })
  city: string | null;

  @Column('char', { name: 'BLOODTYPE', nullable: true, length: 4 })
  bloodtype: number;
}
