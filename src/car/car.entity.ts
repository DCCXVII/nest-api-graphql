import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cars')
export class Car{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar',length:255})
    make: string;

    @Column({type:'varchar',length:255})
    model:string;

    @Column({type:'integer',nullable:true})
    year:number;

    @Column({ type: 'varchar', length: 255, nullable: true })
  color: string;

  @Column({ type: 'integer', nullable: true })
  mileage: number;

  @Column({ type: 'numeric', nullable: true })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fuelType: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  transmission: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  engine: string;

  @Column({ type: 'integer', nullable: true })
  horsepower: number;

  @Column({ type: 'text', array: true, nullable: true })
  features: string[];

  @Column({ type: 'integer', nullable: true })
  owners: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;
}