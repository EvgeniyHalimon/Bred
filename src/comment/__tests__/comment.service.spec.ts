import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from '../comment.service';
import Comment from '../comment.schema';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let mockCommentsModel: {
    findOne: jest.Mock;
    findAndCountAll: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    destroy: jest.Mock;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
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
    mockCommentsModel = module.get(getModelToken(Comment));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(commentsService).toBeDefined();
  });

  /*   describe('CommentsService create method', async () => {});

  describe('CommentsService patch method', async () => {});

  describe('CommentsService delete method', async () => {});

  describe('CommentsService findAll method', async () => {}); */

  describe('CommentsService findOne method', () => {
    it('should return a comment by id', async () => {
      const mockComment = {
        id: '1',
        text: 'This is a comment',
      };

      (mockCommentsModel.findOne as jest.Mock).mockResolvedValue(mockComment);

      const result = await commentsService.findOne({
        commentId: mockComment.id,
      });

      expect(mockCommentsModel.findOne).toHaveBeenCalledWith({
        where: { id: mockComment.id },
      });

      expect(result).toEqual(mockComment);
    });

    /*     it('should return', async () => {}); */
  });
});
