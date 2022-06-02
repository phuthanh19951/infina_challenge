import { Test, TestingModule } from '@nestjs/testing';
import { UserDocument } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const mockUserService = {
      create: jest.fn(x => x),
      findOne: jest.fn(x => x),
      update: jest.fn(x => x)
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver, 
        {
          provide: UserService,
          useValue: mockUserService
        }
    ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser function', () => {
    it('should call create function of user service', async () => {
      const payload = {
        fullName: "steven", 
        phone: "0334567891",
        gender: "male",
        age: 22
      };

      await resolver.createUser(payload);
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(payload);
    });

    it('should return a new user', async () => {
      const payload = {
        fullName: "steven", 
        phone: "0334567891",
        gender: "male",
        age: 22
      };
      
      const result = await resolver.createUser(payload);
      expect(result).toEqual({
        fullName: "steven", 
        phone: "0334567891",
        gender: "male",
        age: 22
      });
    });
  });

  describe('findOne function', () => {
    it('should call findOne function of user service', async () => {
      const userId = "629834fcbc8ad34b329aa051";

      await resolver.findOne(userId);
      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledWith(userId);
    });

    it('should throw error when user not found', async () => {
      const userId = "629834fcbc8ad34b329aa051";
      
      jest.spyOn(service, 'findOne').mockRejectedValue(`User with id ${userId} does not exist`)

      try {
        await resolver.findOne(userId);
      } catch (err) {
        expect(err).toEqual(`User with id ${userId} does not exist`);
      }
    });

    it('should return an specific user', async () => {
      const userId = "629834fcbc8ad34b329aa052";
      
      jest.spyOn(service, 'findOne').mockResolvedValue({
        fullName: "steven", 
        phone: "0334567891",
        gender: "male",
        age: 22
      } as UserDocument)

      const received = await resolver.findOne(userId);
      expect(received).toEqual({
        fullName: "steven", 
        phone: "0334567891",
        gender: "male",
        age: 22
      });
    });
  });
});
