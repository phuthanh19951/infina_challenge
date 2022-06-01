import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  readonly fullName: string;

  @Field(() => String)
  readonly phone: string;

  @Field(() => String)
  readonly gender: string;

  @Field(() => Int)
  readonly age: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt?: Date;

  @Field(() => Date)
  deletedAt?: Date;
}