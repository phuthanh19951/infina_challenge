import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderType } from './types/order.types';
import { Order } from './entities/order.entity';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Create a new order
   * 
   * @param createOrderInput 
   * @returns a new order
   */
  @Mutation(() => Order)
  async createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput): Promise<OrderType> {
    return await this.orderService.create(createOrderInput);
  }

  /**
   * Return all orders of a specific user.
   * 
   * @param userId - The id of user
   * @returns all orders of a specific user
   */
  @Query(() => [Order], { name: 'orders' })
  async findAllOrderByUser(@Args('user', { type: () => String }) user: string): Promise<OrderType[]> {
    return await this.orderService.findAllByUserId(user);
  }

  /**
   * Return the specific order by id
   * 
   * @param id - The order id
   * @returns Order detail
   */
  @Query(() => Order, { name: 'order' })
  async findOne(@Args('id', { type: () => Int }) id: string): Promise<OrderType> {
    return await this.orderService.findOne(id);
  }

  /**
   * Returns the accruedAmount of order.
   * 
   * @param order - The current order
   * @returns The accruedAmount of order
   */
  @ResolveField('accruedAmount', (returns) => Int)
  accruedAmount(
    @Parent() order
  ): Number[] {
	const { amount, interestRate } = order;
    return this.orderService.getAccruedAmount(amount, interestRate);
  }
}
