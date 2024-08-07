import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "./car.entity";
import { CarRepository } from "./car.repo";
import { NotFoundError } from "rxjs";
import { Repository } from "typeorm";

@Injectable()
export class CarService{
    constructor(
        @InjectRepository(Car)
        private carRepository: Repository<Car>,
){}

// FetchCar
    public async getCar():Promise<{status: number;message:string; cars:Car[]}>{
        try{
            const cars = await this.carRepository.find();
            if(!cars|| cars.length===0){
                throw new HttpException('No cars fooound',HttpStatus.NOT_FOUND);
            }
                return { status: HttpStatus.OK, message: 'success', cars };
        }catch(error){
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let message = 'Ineternal Server Error';
            if(error instanceof HttpException){
                status = error.getStatus();
                let errorMessage = error.getResponse();
                message = typeof errorMessage === 'string' ? errorMessage = 'An error occured' : '';
            }
            return {status, message, cars: []};
        }
    }

// CreateCar

    public async postCar(carData: Partial<Car>):Promise<Car>{
        // Check if the ID is provided
        if(carData.hasOwnProperty('id') && carData.id !== undefined){

            const existingCar = await this.carRepository.findOne({where : {id : carData.id}});
            
            if(existingCar){
                throw new HttpException('A car with the provided ID already exists', HttpStatus.CONFLICT);
            }
        }

        const requiredFields = ['make','model', 'year', "color","mileage", "price","transmission", "energine", "horsepower", "features", "owners", "image"];
        for(const field of requiredFields){
            if(!(field in carData) || !carData[field]){
                throw new HttpException(`Missing required field: ${field}`, HttpStatus.BAD_REQUEST);
            }
        }

        const newCar = this.carRepository.create(carData);
        const savedCar = await this.carRepository.save(newCar);
        return savedCar;
    }

    public async getCarByID(id: number):Promise<{status: number; message: string;car:Car}>{
        try{
            const car = await this.carRepository.findOne({where:{id}});
            if(!car){
                throw new NotFoundException(`Car with ID ${id} not found`)
            }
            return {status: HttpStatus.OK, message: 'success', car};
        }catch(error){
            if(error instanceof NotFoundException){
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Internal server error',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    public async deleteCarByID(id: number) : Promise<{status: number; message: string }>{
        try{
            const car = await this.carRepository.findOne({where : {id}});
            if(!car){
                throw new NotFoundException(`Car with ID ${id} not found `);
            }
            await this.carRepository.remove(car);
            return {status: HttpStatus.OK, message : `Car with ID : ${id} deleted successfully`};
        }catch(error){
            if(error instanceof NotFoundException){
                throw new HttpException(error.message , HttpStatus.NOT_FOUND)
            }
            throw new HttpException('Internal server error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async putCarByID(id : number , carData:Partial<Car>):Promise<{status: number; message : string; updatedCar?: Car}>{
        try{
            const car = await this.carRepository.findOne({where :{id}})

            if(!car){
                throw new NotFoundException(`Car with ID ${id} not found`)
            }

            const updatedCarData : Partial<Car> = {...car,...carData};

            const updatedCar = await this.carRepository.save(updatedCarData);

            return {status : HttpStatus.OK, message : `Car with ID ${id} updated successfully`, updatedCar}
        }catch(error){
            if(error instanceof NotFoundError){
                throw error;
            }
            throw new HttpException('Internal servere error',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}