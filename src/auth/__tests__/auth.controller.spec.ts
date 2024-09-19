import { Test } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { SignInResponseDto, SignUpResponseDto } from '../dto';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    signUp: jest.fn(),
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  const singInDto = {
    email: 'w@email.com',
    password: '1234',
  };

  const signUpDto = {
    firstName: 'string',
    lastName: 'string',
    email: 'w@email.com',
    password: '1234',
    bio: 'string',
  };

  describe('SignUp method', () => {
    it('SignUp must be called with correct parameters', async () => {
      await authController.signUp(signUpDto);
      expect(mockAuthService.signUp).toHaveBeenCalledWith(signUpDto);
    });

    it('should return instance of response dto', async () => {
      const mockResult = new SignUpResponseDto();
      mockAuthService.signUp.mockResolvedValue(mockResult);
      const result = await authController.signUp(signUpDto);
      expect(result).toBeInstanceOf(SignUpResponseDto);
    });
  });

  describe('SignIn method', () => {
    it('SignIn must be called with correct parameters', async () => {
      await authController.signIn(singInDto);
      expect(mockAuthService.signIn).toHaveBeenCalledWith(singInDto);
    });

    it('should return instance of response dto', async () => {
      const mockResult = new SignInResponseDto();
      mockAuthService.signIn.mockResolvedValue(mockResult);
      const result = await authController.signIn(singInDto);
      expect(result).toBeInstanceOf(SignInResponseDto);
    });
  });
});