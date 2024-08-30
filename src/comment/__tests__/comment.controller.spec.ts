import { Test } from '@nestjs/testing';
import { CommentController } from '../comment.controller';
import { CommentsService } from '../comment.service';

describe('CommentController', () => {
  let commentController: CommentController;

  const mockCommentsService = {
    findAll: jest.fn(),
    patch: jest.fn(),
    deleteById: jest.fn(),
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

  describe('Create method', () => {});
  describe('Delete method', () => {});
  describe('Patch method', () => {});
  describe('GetAll method', () => {});
});
