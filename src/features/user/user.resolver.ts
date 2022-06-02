import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserType } from './types/user.types';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * Create a new user
   * 
   * @param createUserInput - the create user information
   * @returns the created user information
   */
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<UserType> {
    return this.userService.create(createUserInput);
  }

  /**
   * Returns a specific user by id
   * 
   * @param id - the id of user
   * @returns specific user
   */
  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => String }) id: string):  Promise<UserType> {
    return await this.userService.findOne(id);
  }

  /**
   * Update user information
   * 
   * @param updateUserInput - user information which is needed to update
   * @returns the updated user information
   */
  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<UserType> {
    return await this.userService.update(updateUserInput._id, updateUserInput);
  }

  /**
   * Returns total amount of all orders of an user
   * 
   * @param user - The current user
   * @returns total amount of all orders of an user
   */
  @ResolveField('totalAmount', (returns) => Int)
  async totalAmount(
    @Parent() user
  ): Promise<Number> {
    return await this.userService.getTotalOrderAmount(user.id);
  }
}
