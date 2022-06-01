import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Order } from '../order/entities/order.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';
import { UserType } from './types/user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ){}

  async create(createUserInput: CreateUserInput): Promise<UserType> {
    return await this.userModel.create(createUserInput);
  }

  async findOne(id: string): Promise<UserType> {
    return await this.userModel.findById(id);
  }

  async update(id: ObjectId, updateUserInput: UpdateUserInput): Promise<UserType> {
    delete updateUserInput._id;
    return await this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true });
  }

  async getTotalOrderAmount(userId: string): Promise<Number>{
    const user = await this.userModel.findById(userId).populate('orders');
    return user.orders.reduce((total, order) => total + order.amount, 0);
  }
}
