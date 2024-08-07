import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRepository } from './car.repo';
import { Car } from './car.entity';

@Module({
    imports : [
        TypeOrmModule.forFeature([Car,CarRepository]),
    ],
    exports : [TypeOrmModule],
})
export class CarModule {}
