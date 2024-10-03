import { Test } from '@nestjs/testing';
import { CommentController } from '../comment.controller';
import { CommentsService } from '../comment.service';
import { ICustomRequest, vocabulary } from 'src/shared';
import { GetAllCommentsPresenter, PatchCommentPresenter } from '../dto';
import Comment from '../comment.schema';

const {
  comments: { SUCCESSFUL_DELETE_OF_COMMENT },
} = vocabulary;

describe('CommentController', () => {
  let commentController: CommentController;

  const mockCommentsService = {
    findAll: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentsService,
          useValue: mockCommentsService,
        },
      ],
    }).compile();

    commentController = moduleRef.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(commentController).toBeDefined();
  });

  const req = {
    user: {
      id: '1',
    },
  } as ICustomRequest;
  const commentId = 'commentId';

  const createCommentDto = {
    articleId: '22',
    text: 'Title',
  };

  describe('Create method', () => {
    it('Create method must be called with correct parameters', async () => {
      await commentController.create(req, createCommentDto);
      expect(mockCommentsService.create).toHaveBeenCalledWith({
        userId: '1',
        createCommentDto,
      });
    });
  });

  describe('Delete method', () => {
    it('Delete method must be called', async () => {
      const result = await commentController.delete(req, commentId);
      expect(mockCommentsService.delete).toHaveBeenCalledWith({
        userId: req.user.id,
        commentId: commentId,
      });
      expect(result).toEqual({
        message: SUCCESSFUL_DELETE_OF_COMMENT,
      });
    });
  });

  describe('Patch method', () => {
    const updateCommentDto = { text: 'new text' };
    it('Method patch should returned instance of response dto', async () => {
      const mockResult = new PatchCommentPresenter({
        id: '48245dd4-15e0-4060-bdec-539e4598ef6a',
        authorId: '785e6094-2f33-49a9-b015-25cd12dab20a',
        articleId: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
        text: 'erwerwerw',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Comment);

      jest.spyOn(mockCommentsService, 'patch').mockResolvedValue(mockResult);

      const result = await commentController.patch(
        req,
        commentId,
        updateCommentDto,
      );
      expect(result).toBeInstanceOf(PatchCommentPresenter);
    });

    it('Method patch must be called with correct parameters', async () => {
      await commentController.patch(req, commentId, updateCommentDto);
      expect(mockCommentsService.patch).toHaveBeenCalledWith({
        userId: req.user.id,
        commentId,
        updateCommentDto,
      });
    });
  });

  describe('FindAll method', () => {
    it('Method patch must be called and should return instance of response dto', async () => {
      const mockResult = new GetAllCommentsPresenter([], 1);
      jest.spyOn(mockCommentsService, 'findAll').mockResolvedValue(mockResult);

      const result = await commentController.findAll({
        page: '1',
      });
      expect(result).toBeInstanceOf(GetAllCommentsPresenter);
    });

    it('Method findAll must be called with correct parameters', async () => {
      await commentController.findAll({
        page: '1',
        limit: '10',
        text: 'Text',
        order: 'ASC',
        orderBy: 'createdAt',
      });

      expect(mockCommentsService.findAll).toHaveBeenCalledWith({
        page: '1',
        limit: '10',
        text: 'Text',
        order: 'ASC',
        orderBy: 'createdAt',
      });
    });
  });
});
