import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './car/car.module';
import {ConfigModule} from '@nestjs/config';
import { RequestLoggerMiddleware } from './car/request-logger.middleware';
import { CarController } from './car/car.controller';
import { CarService } from './car/car.service';
import { Car } from './car/car.entity';
import { CarRepository } from './car/car.repo';


@Module({
  imports: [
    CarModule,
    TypeOrmModule.forFeature([Car,CarRepository]),
    ConfigModule.forRoot({isGlobal:true}),
  TypeOrmModule.forRoot({
      type:"postgres",
      host:process.env.POSTGRES_HOST,
      port:parseInt(process.env.POSTGRES_PORT),
      username:process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities:true,
      synchronize:true,
    })
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(RequestLoggerMiddleware)
    .forRoutes('*');
  }
}
