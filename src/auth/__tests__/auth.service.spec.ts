import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { getModelToken } from '@nestjs/sequelize';
import User from 'src/user/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as passwordUtils from 'src/auth/utils/passwordUtils';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserModel: {
    findOne: jest.Mock;
    create: jest.Mock;
    scope: jest.Mock;
  };

  let mockJwtService: {
    signAsync: jest.Mock;
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            scope: jest.fn().mockReturnThis(),
          },
        },
        {
          provide: JwtService, // Mock JwtService
          useValue: {
            sign: jest.fn(), // Mock its methods
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    mockUserModel = module.get(getModelToken(User));
    mockJwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  const user = {
    id: 'string',
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    password: 'string',
    bio: 'string',
    role: 'user',
    createdAt: new Date('2024-08-14T08:40:32.000Z'),
    updatedAt: new Date('2024-08-14T08:40:32.000Z'),
    photo: null,
  };

  /* const singInDto = {
      email: 'w@email.com',
      password: '1234',
    }; */

  const signUpDto = {
    firstName: 'string',
    lastName: 'string',
    email: 'tt@email.com',
    password: 'hashed-password',
    bio: 'string',
  };

  /* describe('SignIn method', () => {
      it('', () => {});
      it('should throw NotFoundException if user not found', () => {});
      it('should throw BadRequestException if password mismatch', () => {});
    }); */

  describe('SignUp method', () => {
    it('create new comment user', async () => {
      mockUserModel.scope.mockReturnValue({
        findOne: jest.fn().mockResolvedValue(null),
      });
      mockUserModel.create.mockResolvedValue(user);
      jest
        .spyOn(passwordUtils, 'hashPassword')
        .mockResolvedValue('hashed-password');
      const result = await authService.signUp(signUpDto);
      expect(mockUserModel.create).toHaveBeenCalledWith({
        ...signUpDto,
        password: 'hashed-password',
      });
      expect(result).toEqual(user);
    });
    /* it('should throw BadRequestException if user exist', () => {}); */
  });
});
