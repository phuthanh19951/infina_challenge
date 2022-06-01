import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class OrderType {
  @Field(() => String)
  readonly _id: string;

  @Field(() => MongooseSchema.Types.ObjectId)
  readonly user: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  readonly code: string;

  @Field(() => Int)
  readonly amount: number;

  @Field(() => Float)
  readonly interestRate: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt?: Date;

  @Field(() => Date)
  deletedAt?: Date;
}