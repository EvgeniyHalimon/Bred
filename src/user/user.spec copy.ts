import { Test } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import User from './user.schema';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'mysql',
          storage: ':memory:',
        }),
        SequelizeModule.forFeature([User]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
      exports: [UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = {
        users: [
          {
            id: 'string',
            firstName: 'string',
            lastName: 'string',
            email: 'string',
            password: 'string',
            bio: 'string',
            role: 'user',
            createdAt: '2024-08-14T08:40:32.000Z',
            updatedAt: '2024-08-14T08:40:32.000Z',
            photo: 'string',
            articles: [],
            comments: [],
            reactions: [],
          },
        ] as any,
        count: 1,
      };

      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(async () => result);

      expect(await usersController.findAll()).toBe(result);
    });
  });
});
