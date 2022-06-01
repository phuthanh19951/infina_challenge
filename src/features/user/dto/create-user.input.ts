import { InputType, Int, Field } from '@nestjs/graphql';
import {  Matches, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { Gender } from '../user.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  fullName: string;

  @Field(() => String)
  @Matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/, {
     message: 'Phone must be in Vietnamese phone number format'
  })
  phone: string;

  @Field(() => Int)
  @IsNumber({}, {
    message: 'Age must be number'
  })
  age: number;

  @Field(() => String)
  @IsEnum(Gender, {
    message: 'Gender must be one of the following values: female, male or other'
  })
  gender: string;
}
