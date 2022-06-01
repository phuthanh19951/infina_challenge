import { IsNotEmpty, IsNumber, Length } from 'class-validator';
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  @IsNotEmpty()
  user: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber({}, {
    message: 'Amount must be number'
  })
  amount: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber({}, {
    message: 'InterestRate must be number'
  })
  interestRate: number;
}
