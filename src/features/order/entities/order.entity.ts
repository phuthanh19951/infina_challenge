import { Float, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';

@Schema({
  collection: 'orders',
  autoCreate: true
})
export class Order {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, required: true, unique: true, length: 5 })
  code: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Number, required: true })
  interestRate: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;

  @Prop()
  deletedAt?: Date;
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);