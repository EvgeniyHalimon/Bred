import { Test } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dto';
import { ICustomRequest } from 'src/shared';
import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;

  const mockUsersService = {
    findAll: jest.fn(),
    patch: jest.fn(),
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

  describe('findAll call', () => {
    it('should call', async () => {
      await usersController.findAll();
      expect(mockUsersService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll result', () => {
    it('should return value', async () => {
      const mockResult = {
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
        ],
        count: 1,
      };

      jest.spyOn(mockUsersService, 'findAll').mockResolvedValue(mockResult);

      const result = await usersController.findAll();
      expect(result).toEqual(mockResult);
    });
  });

  describe('patch', () => {
    it('should call', async () => {
      const updateUserDto = {} as UpdateUserDto;
      const file: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: 1024,
        stream: {} as any,
        destination: '',
        filename: 'test.png',
        path: '',
        buffer: Buffer.from(''),
      };
      const req = {
        user: {
          id: 'string',
        },
      } as ICustomRequest;
      await usersController.patch(updateUserDto, file, req);
      expect(mockUsersService.patch).toHaveBeenCalledTimes(1);
    });

    it('should throw a validation error for an invalid file type', async () => {
      const updateUserDto = {} as UpdateUserDto;
      const file = {
        mimetype: 'image/svg+xml',
      } as Express.Multer.File;
      const req = { user: { id: '123' } } as ICustomRequest;

      const b = usersController.patch(updateUserDto, file, req);
      console.log('🚀 ~ file: user.controller.spec.ts:99 ~ it ~ b:', b);

      await expect(b).rejects.toThrow(
        new BadRequestException('Only jpg, jpeg, png, webp files are allowed'),
      );
    });

    it('should throw a validation error for a file size exceeding the limit', async () => {
      const updateUserDto = {} as UpdateUserDto;
      const file = {
        mimetype: 'image/png',
        size: 5 * 1024 * 1024,
      } as Express.Multer.File;
      const req = { user: { id: '123' } } as ICustomRequest;
      const b = usersController.patch(updateUserDto, file, req);
      await expect(b).rejects.toThrow(
        new BadRequestException('File should be 0.5mb or less'),
      );
    });
  });
});
