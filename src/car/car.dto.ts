export class CarDto{
    readonly id:number;
    readonly make: string;
    readonly model: string;
    readonly year: number;
    readonly color: string;
    readonly mileage: number;
    readonly price: number;

    constructor(id: number, make: string, model: string, year: number,color:string,mileage:number,price:number){
        this.id = id;
        this.make = make;
        this.model = model;
        this.year = year;
        this.color = color;
        this.mileage = mileage;
        this.price = price;
    }
}