import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "./car.entity";

@Injectable()
export class CarService{
    constructor(
        @InjectRepository(Car)
        private carRepository:CarRepository<Car>,
){}

public async getCar():Promise<{status: number;message:string; cars:Car[]}>{
    try{
        const cars = await this.carRepository.find();
        if(!cars|| cars.length===0){
            throw new HttpException('No cars fooound',HttpStatus.NOT_FOUND);
        }
        reutrn {status : }
    }
}
}