import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRepository } from './car.repo';

@Module({
    imports : [
        TypeOrmModule.forFeature([Car,CarRepository]),
    ],
    exports : [TypeOrmModule],
})
export class CarModule {}
