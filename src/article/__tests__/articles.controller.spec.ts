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

  const patchArticleDto = {
    title: 'Text',
    text: 'Text',
  };

  const articleId = 'articleId';

  describe('Create method', () => {
    it('Create method must be called with correct parameters', async () => {
      await articlesController.create(req, createArticleDto);
      expect(mockArticlesService.create).toHaveBeenCalledWith({
        userId: '1',
        createArticleDto,
      });
    });
  });

  describe('Delete method', () => {
    it('Delete must be called', async () => {
      const result = await articlesController.delete(req, articleId);

      expect(result).toEqual({ message: 'Article deleted successfully' });
    });

    it('Delete must be called with correct parameters', async () => {
      await articlesController.delete(req, articleId);
      expect(mockArticlesService.delete).toHaveBeenCalledWith({
        userId: req.user.id,
        articleId,
      });
    });
  });

  describe('Patch method', () => {
    /*  it('Method patch should returned instance of response dto', async () => {
     
    }); */

    it('Method patch must be called with correct parameters', async () => {
      await articlesController.patch(req, patchArticleDto, articleId);
      expect(mockArticlesService.patch).toHaveBeenCalledWith({
        articleId,
        userId: req.user.id,
        patchArticleDto,
      });
    });
  });

  describe('GetById method', () => {});

  describe('FindAll method', () => {});
});
