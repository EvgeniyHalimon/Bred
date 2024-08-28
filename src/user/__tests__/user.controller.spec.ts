import { Test } from '@nestjs/testing';
import { UsersController } from '../user.controller';
import { UsersService } from '../user.service';
import { GetAllUsersResponseDto, UpdateUserDto, UserDto } from '../dto';
import { ICustomRequest } from 'src/shared';

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

    it('should return value', async () => {
      const mockResult = new GetAllUsersResponseDto();

      jest.spyOn(mockUsersService, 'findAll').mockResolvedValue(mockResult);

      const result = await usersController.findAll();
      expect(result).toBeInstanceOf(GetAllUsersResponseDto);
    });
  });

  describe('patch', () => {
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
    it('should call', async () => {
      await usersController.patch(updateUserDto, file, req);
      expect(mockUsersService.patch).toHaveBeenCalledTimes(1);
    });

    it('should return value', async () => {
      const mockResult = new UserDto();

      jest.spyOn(mockUsersService, 'patch').mockResolvedValue(mockResult);

      const result = await usersController.patch(updateUserDto, file, req);
      expect(result).toBeInstanceOf(UserDto);
    });

    it('should call the service with the correct parameters', async () => {
      const updateUserDto = { email: 'newemail@example.com' } as UpdateUserDto;
      const file = {
        mimetype: 'image/png',
        buffer: Buffer.from('image data'),
      } as Express.Multer.File;
      const req = { user: { id: '123' } } as ICustomRequest;

      await usersController.patch(updateUserDto, file, req);

      expect(mockUsersService.patch).toHaveBeenCalledWith({
        updateUserDto,
        file: file.buffer.toString('base64url'),
        userId: req.user.id,
      });
    });
  });
});
