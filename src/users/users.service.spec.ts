import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

const mockUser = {
  _id: '644ecd398c8c6ee942660256',
  username: 'GAlvarez',
  name: 'Gonzalo',
  lastName: 'Alvarez',
  address: 'Generic Street 1234',
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'UserModel',
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>('UserModel');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });
});
