import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/user/user.service';
import { CommentsService } from '../comment.service';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let mockCommentsModel: typeof Comment;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(Comment),
          useValue: {
            findAndCountAll: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
    mockCommentsModel = module.get<typeof Comment>(getModelToken(Comment));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(commentsService).toBeDefined();
  });

  describe('Create method', async () => {});

  describe('Patch method', async () => {});

  describe('Delete method', async () => {});

  describe('FindAll method', async () => {});

  describe('FindOne method', async () => {});
});
