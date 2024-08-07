import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CarService } from "./car.service";
import { CarDto } from "./car.dto";
import { Car } from "./car.entity";

@Controller('car')
export class CarController{

    constructor(private readonly carService:CarService){}
        
        @Get()
        public getCar(){
            return this.carService.getCar();
        }

        @Post()
        public async postCar(@Body() car:CarDto){
            return this.carService.postCar(car);
        }

        @Get(':id')
        public async getCarById(@Param('id') id:number){
            return this.carService.getCarByID(id);
        }

        @Delete(':id')
        public async deleteCarById(@Param('id') id:number){
            return this.carService.deleteCarByID(id);
        }

        @Put(':id')
    public async putCarByID(@Param('id') id: number, @Body() carData: Partial<Car>) {
            return this.carService.putCarByID(id,carData);
        }
    }

