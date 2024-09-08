import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from '../comment.service';
import Comment from '../comment.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let mockCommentsModel: {
    findOne: jest.Mock;
    findAndCountAll: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    set: jest.Mock;
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
            set: jest.fn(),
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

  const comment = {
    id: 'd561e01f-fdc4-4a3f-8ea2-af7ff9db6ed9',
    text: 'cool',
    articleId: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
    authorId: 'd0601328-1486-434a-860e-75b843a682db',
    updatedAt: '2024-09-02T12:09:07.258Z',
    createdAt: '2024-09-02T12:09:07.258Z',
  };

  describe('CommentsService create method', () => {
    const createCommentDto = {
      text: 'cool',
      articleId: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
    };
    it('it create new comment', async () => {
      mockCommentsModel.create.mockResolvedValue(comment);
      const result = await commentsService.create({
        userId: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
        createCommentDto,
      });
      expect(mockCommentsModel.create).toHaveBeenCalledWith({
        ...createCommentDto,
        authorId: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
      });
      expect(result).toEqual(comment);
    });
  });

  describe('CommentsService patch method', () => {
    const updateCommentDto = {
      text: 'TEST',
    };
    const updateComment = {
      userId: 'd0601328-1486-434a-860e-75b843a682db',
      commentId: 'd561e01f-fdc4-4a3f-8ea2-af7ff9db6ed9',
      updateCommentDto,
    };

    it('should successfully patch a comment', async () => {
      mockCommentsModel.findOne.mockResolvedValue({
        save: mockCommentsModel.save.mockResolvedValue(comment),
        set: mockCommentsModel.set,
      });

      const result = await commentsService.patch(updateComment);

      expect(mockCommentsModel.findOne).toHaveBeenCalledTimes(2);
      expect(mockCommentsModel.set).toHaveBeenCalledWith(updateCommentDto);
      expect(mockCommentsModel.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(comment);
    });

    it('should throw NotFoundException if comment not found', async () => {
      mockCommentsModel.findOne.mockResolvedValue(null);
      try {
        await commentsService.patch(updateComment);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Comment not found');
      }
    });

    it('should throw NotFoundException if user are not author of this comment', async () => {
      mockCommentsModel.findOne.mockResolvedValueOnce(updateComment);
      mockCommentsModel.findOne.mockResolvedValueOnce(null);
      try {
        await commentsService.patch(updateComment);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('You are not author of this comment');
      }
    });
  });

  describe('CommentsService delete method', () => {
    const deleteComment = () => {
      return commentsService.delete({
        userId: '1',
        commentId: '11',
      });
    };
    it('should successfully delete a comment', async () => {
      mockCommentsModel.findOne.mockResolvedValue(comment);
      await deleteComment();
      expect(mockCommentsModel.destroy).toHaveBeenCalledWith({
        where: { id: '11' },
      });
    });

    it('should throw NotFoundException if comment not found', async () => {
      mockCommentsModel.findOne.mockResolvedValue(null);
      try {
        await deleteComment();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Comment not found');
      }
    });

    it('should throw NotFoundException if user are not author of this comment', async () => {
      mockCommentsModel.findOne.mockResolvedValueOnce(comment);
      mockCommentsModel.findOne.mockResolvedValueOnce(null);
      try {
        await deleteComment();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('You are not author of this comment');
      }
    });

    it('should throw BadRequestException if comment not found', async () => {
      mockCommentsModel.findOne.mockResolvedValue(comment);
      try {
        await deleteComment();
        mockCommentsModel.destroy.mockResolvedValue(0);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe(
          'Something went wrong while deleting the comment',
        );
      }
    });
  });

  describe('CommentsService findAll method', () => {
    it('should return comments and count', async () => {
      const result = {
        rows: [
          {
            id: 'd561e01f-fdc4-4a3f-8ea2-af7ff9db6ed9',
            authorId: 'd0601328-1486-434a-860e-75b843a682db',
            articleId: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
            text: 'cool',
            createdAt: '2024-09-02T12:09:07.000Z',
            updatedAt: '2024-09-02T12:09:07.000Z',
            author: {
              id: 'd0601328-1486-434a-860e-75b843a682db',
              firstName: 'string',
              lastName: 'string',
              email: 'q@email.com',
              bio: 'Hello my name is Monti',
              role: 'user',
              photo: '',
              createdAt: '2024-08-14T08:40:32.000Z',
              updatedAt: '2024-08-23T11:50:47.000Z',
            },
            reactions: [],
          },
        ],
        count: 1,
      };

      jest
        .spyOn(mockCommentsModel, 'findAndCountAll')
        .mockResolvedValue(result);

      const comments = await commentsService.findAll({
        query: {
          page: '1',
        },
      });

      expect(mockCommentsModel.findAndCountAll).toHaveBeenCalledTimes(1);
      expect(comments).toEqual({
        comments: result.rows,
        count: result.count,
      });
    });
  });

  describe('CommentsService findOne method', () => {
    it('should return a comment by id', async () => {
      const mockComment = {
        id: '1',
        text: 'This is a comment',
      };

      mockCommentsModel.findOne.mockResolvedValue(mockComment);

      const result = await commentsService.findOne({
        id: mockComment.id,
      });

      expect(mockCommentsModel.findOne).toHaveBeenCalledWith({
        where: { id: mockComment.id },
      });

      expect(result).toEqual(mockComment);
    });

    it('should return null if no user is found', async () => {
      mockCommentsModel.findOne.mockResolvedValue(null);

      const result = await commentsService.findOne({ id: '2' });

      expect(mockCommentsModel.findOne).toHaveBeenCalledWith({
        where: { id: '2' },
      });
      expect(result).toBeNull();
    });
  });
});
