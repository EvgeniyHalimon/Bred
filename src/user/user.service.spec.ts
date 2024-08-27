import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { getModelToken } from '@nestjs/sequelize';
import User from './user.schema';
import { UsersService } from './user.service';

import * as passwordUtils from 'src/auth/utils/passwordUtils';

jest.mock('src/auth/utils/passwordUtils');

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            findAndCountAll: jest.fn(),
            findOne: jest.fn(),
            build: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockUserModel = module.get<typeof User>(getModelToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return users and count', async () => {
      const result = {
        rows: [
          {
            id: 'string',
            firstName: 'string',
            lastName: 'string',
            email: 'string',
            password: 'string',
            bio: 'string',
            role: 'user',
            createdAt: new Date('2024-08-14T08:40:32.000Z'),
            updatedAt: new Date('2024-08-14T08:40:32.000Z'),
            photo: 'string',
            articles: [],
            comments: [],
            reactions: [],
          },
        ],
        count: 1,
      };
      jest
        .spyOn(mockUserModel, 'findAndCountAll')
        .mockResolvedValue(result as any);

      const users = await service.findAll();

      expect(users).toEqual({
        users: result.rows,
        count: result.count,
      });
    });
  });

  describe('patch', () => {
    it('should successfully patch a user', async () => {
      const mockUser = {
        set: jest.fn(),
        save: jest.fn().mockResolvedValue({
          id: 'string',
          firstName: 'string',
          lastName: 'string',
          email: 'string',
          password: 'string',
          bio: 'string',
          role: 'user',
          createdAt: new Date('2024-08-14T08:40:32.000Z'),
          updatedAt: new Date('2024-08-14T08:40:32.000Z'),
          photo: 'string',
          articles: [],
          comments: [],
          reactions: [],
        }),
      };

      (mockUserModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
      (passwordUtils.hashPassword as jest.Mock).mockResolvedValue(
        'hashed-password',
      );

      const updateUserDto = {
        email: 'new@example.com',
        firstName: '',
        lastName: '',
        password: 'plain-text-password',
        bio: '',
      };

      const result = await service.patch({
        updateUserDto,
        file: undefined,
        userId: '1',
      });

      const u = {
        id: 'string',
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        password: 'string',
        bio: 'string',
        role: 'user',
        createdAt: new Date('2024-08-14T08:40:32.000Z'),
        updatedAt: new Date('2024-08-14T08:40:32.000Z'),
        photo: 'string',
        articles: [],
        comments: [],
        reactions: [],
      };

      expect(result).toEqual(u);
      expect(mockUser.set).toHaveBeenCalledWith({
        ...updateUserDto,
        password: 'hashed-password',
        photo: undefined,
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      (mockUserModel.findOne as jest.Mock).mockResolvedValue(null);
      await expect(
        service.patch({
          updateUserDto: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            bio: '',
          },
          file: undefined,
          userId: '1',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if email is taken', async () => {
      const mockUser = {
        set: jest.fn(),
        save: jest.fn(),
      };
      (mockUserModel.findOne as jest.Mock).mockResolvedValueOnce({ id: '2' });
      (mockUserModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

      await expect(
        service.patch({
          updateUserDto: {
            email: 'taken@example.com',
            firstName: '',
            lastName: '',
            password: '',
            bio: '',
          },
          file: undefined,
          userId: '1',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should hash password if provided', async () => {
      const mockUser = {
        set: jest.fn(),
        save: jest.fn().mockResolvedValue({}),
      };
      (mockUserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'hash' as any).mockResolvedValue('hashed-password');

      const result = await service.patch({
        updateUserDto: {
          password: 'plain-text-password',
          firstName: '',
          lastName: '',
          email: '',
          bio: '',
        },
        file: undefined,
        userId: '1',
      });

      expect(result).toEqual({});
      expect(mockUser.set).toHaveBeenCalledWith({
        password: 'hashed-password',
        firstName: '',
        lastName: '',
        email: '',
        bio: '',
        photo: undefined,
      });
    });

    it('should hash password if provided', async () => {
      const updatedUser = {
        id: 'string',
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        password: 'string',
        bio: 'string',
        role: 'user',
        createdAt: new Date('2024-08-14T08:40:32.000Z'),
        updatedAt: new Date('2024-08-14T08:40:32.000Z'),
        photo: 'string',
        articles: [],
        comments: [],
        reactions: [],
      };
      const mockUser = {
        set: jest.fn(),
        save: jest.fn().mockResolvedValue(updatedUser),
      };
      (mockUserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'hash' as any).mockResolvedValue('hashed-password');

      const result = await service.patch({
        updateUserDto: {
          password: 'plain-text-password',
          firstName: '',
          lastName: '',
          email: '',
          bio: '',
        },
        file: undefined,
        userId: '1',
      });

      expect(result).toEqual(updatedUser);
      expect(mockUser.set).toHaveBeenCalledWith({
        password: 'hashed-password',
        firstName: '',
        lastName: '',
        email: '',
        bio: '',
        photo: undefined,
      });
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      (mockUserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findOne({ id: '1' });

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(mockUser);
    });

    it('should return null if no user is found', async () => {
      (mockUserModel.findOne as jest.Mock).mockResolvedValue(null);

      const result = await service.findOne({ id: '2' });

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        where: { id: '2' },
      });
      expect(result).toBeNull();
    });
  });
});
