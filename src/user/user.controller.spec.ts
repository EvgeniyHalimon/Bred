import { Test } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dto';
import { ICustomRequest } from 'src/shared';
import {
  ParseFilePipe,
  MaxFileSizeValidator,
  BadRequestException,
} from '@nestjs/common';
import { CustomFileTypeValidator } from './file.validator';

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

    it('should update', async () => {
      const updateUserDto = { firstName: 'John' } as UpdateUserDto;
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
      const user = {
        id: 'string',
        firstName: 'John',
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
      };
      jest.spyOn(mockUsersService, 'patch').mockResolvedValue(user);

      const result = await usersController.patch(updateUserDto, file, req);
      expect(result).toEqual(user);
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

describe('File validation', () => {
  let parseFilePipe: ParseFilePipe;

  beforeEach(() => {
    parseFilePipe = new ParseFilePipe({
      fileIsRequired: false,
      validators: [
        new MaxFileSizeValidator({
          maxSize: 0.5 * 1024 * 1024,
          message: size => `File should be ${size / 1024 / 1024}mb or less`,
        }),
        new CustomFileTypeValidator({
          fileType: /^(image\/jpg|image\/jpeg|image\/png|image\/webp)$/,
          message: 'Only jpg, jpeg, png, webp files are allowed',
        }),
      ],
      exceptionFactory: error => {
        throw new BadRequestException(error);
      },
    });
  });

  it('should throw BadRequestException for invalid file type', async () => {
    const file = {
      mimetype: 'image/svg+xml',
      size: 1024,
      buffer: Buffer.from(''),
    };

    await expect(() => parseFilePipe.transform(file as any)).rejects.toThrow(
      new BadRequestException('Only jpg, jpeg, png, webp files are allowed'),
    );
  });

  it('should throw BadRequestException for file size exceeding the limit', async () => {
    const file = {
      mimetype: 'image/png',
      size: 5 * 1024 * 1024,
      buffer: Buffer.from(''),
    };

    await expect(() => parseFilePipe.transform(file as any)).rejects.toThrow(
      new BadRequestException('File should be 0.5mb or less'),
    );
  });

  it('should pass validation for valid file type and size', async () => {
    const file = {
      mimetype: 'image/png',
      size: 0.1 * 1024 * 1024,
      buffer: Buffer.from(''),
    };

    await expect(parseFilePipe.transform(file as any)).resolves.toEqual(file);
  });
});
