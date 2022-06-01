import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { User, UserDocument, UserSchema } from '../user/entities/user.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { Order, OrderDocument } from './entities/order.entity';
import { OrderType } from './types/order.types';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: Connection
  ){}

  async create(createOrderInput: CreateOrderInput): Promise<OrderType> {
    try {
      const randomDigitNumber = Math.floor(Math.random() * 90000) + 10000;

      const user = await this.userModel.findById(createOrderInput.user);
      if(!user) {
        throw new NotFoundException(`User with id ${createOrderInput.user} does not exist`);
      }

      const newOrder = await this.orderModel.create({ ...createOrderInput, code: randomDigitNumber.toString() });
      if(!newOrder) {
        throw new InternalServerErrorException('Create order failed');
      }
        
      user.orders.push(newOrder);
      await user.save();

      return newOrder;
    } catch(err) {
      return err;
    }
  }
  
  async findAllByUserId(userId: string): Promise<OrderType[]> {
    return await this.orderModel.find({ user: userId });
  }

  async findOne(id: string): Promise<OrderType> {
    return await this.orderModel.findById(id);
  }

  getAccruedAmount(orderAmount: number, orderInterestRate: number): Number[] {
    const numberOfMonth = 12;
    let accruedAmount = orderAmount;
    let accruedAmounts: Number[] = [];

    for(let i = 1; i <= numberOfMonth; i++) {
      accruedAmount = Math.round(accruedAmount + ((orderInterestRate / numberOfMonth) * accruedAmount));
      accruedAmounts.push(accruedAmount); 
    }

    return accruedAmounts;
  }
}
