import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';
import { Order, OrderSchema } from 'src/features/order/entities/order.entity';
import { Gender } from '../user.enum';

@Schema({
  collection: 'users',
  autoCreate: true
})
export class User {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, required: true, unique: true })
  phone: string;

  @Prop({ type: String, required: true, enum: Gender })
  gender: string;

  @Prop({ type: Number })
  age: number;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Order.name })
  orders: Order[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;

  @Prop()
  deletedAt?: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);