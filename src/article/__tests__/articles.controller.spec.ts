import { Test } from '@nestjs/testing';
import { ArticlesController } from '../article.controller';
import { ArticlesService } from '../article.service';
import { ICustomRequest } from 'src/shared';

describe('ArticlesController', () => {
  let articlesController: ArticlesController;
  const mockArticlesService = {
    findAll: jest.fn(),
    patch: jest.fn(),
    create: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: mockArticlesService,
        },
      ],
    }).compile();
    articlesController = moduleRef.get<ArticlesController>(ArticlesController);
  });

  it('should be defined', () => {
    expect(articlesController).toBeDefined();
  });

  const req = {
    user: {
      id: '1',
    },
  } as ICustomRequest;

  const createArticleDto = {
    title: 'Text',
    text: 'Title',
  };

  describe('Create method', () => {
    it('Create method must be called with correct parameters', async () => {
      await articlesController.create(req, createArticleDto);
      expect(mockArticlesService.create).toHaveBeenCalledWith({
        userId: '1',
        createArticleDto,
      });
    });
  });

  describe('Delete method', () => {});

  describe('Patch method', () => {});

  describe('GetById method', () => {});

  describe('FindAll method', () => {});
});
