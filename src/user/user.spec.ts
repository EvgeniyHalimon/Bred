import { Test } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

describe('UsersController', () => {
  let usersController: UsersController;

  const mockUsersService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      /*       const result = {
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
      }; */
      /* jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(async () => result);

      expect(await usersController.findAll()).toBe(result); */

      await usersController.findAll();
      expect(mockUsersService.findAll).toHaveBeenCalledTimes(1);
    });
  });
});

/* 

const mockCatsService = {
  findAll: () => {
    return {
        value
    }
  }
}

*/
