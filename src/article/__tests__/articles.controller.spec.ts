import { Test } from '@nestjs/testing';
import { ArticlesController } from '../article.controller';
import { ArticlesService } from '../article.service';
import { ICustomRequest } from 'src/shared';
import { ArticleDto, GetAllArticlesResponseDto } from '../dto';

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
    it('Method patch should return an instance of dto', async () => {
      const mockArticle = new ArticleDto();
      jest.spyOn(mockArticlesService, 'patch').mockResolvedValue(mockArticle);
      const result = await articlesController.patch(
        req,
        patchArticleDto,
        articleId,
      );

      expect(result).toEqual(
        expect.objectContaining({
          article: expect.any(ArticleDto),
          message: expect.any(String),
        }),
      );
      expect(result.article).toBeInstanceOf(ArticleDto);
    });

    it('Method patch must be called with correct parameters', async () => {
      await articlesController.patch(req, patchArticleDto, articleId);
      expect(mockArticlesService.patch).toHaveBeenCalledWith({
        articleId,
        userId: req.user.id,
        patchArticleDto,
      });
    });
  });

  describe('GetById method', () => {
    it('Method get should return an instance of dto', async () => {
      const mockResult = new ArticleDto();
      jest.spyOn(mockArticlesService, 'getById').mockResolvedValue(mockResult);
      const result = await articlesController.getById(articleId);
      expect(result).toBeInstanceOf(ArticleDto);
    });

    it('Method get must be call with correct parameters', async () => {
      await articlesController.getById(articleId);
      expect(mockArticlesService.getById).toHaveBeenCalledWith({ articleId });
    });
  });

  describe('FindAll method', () => {
    it('Method findAll must be called and should return instance of response dto', async () => {
      const mockResult = new GetAllArticlesResponseDto();
      jest.spyOn(mockArticlesService, 'findAll').mockResolvedValue(mockResult);

      const result = await articlesController.findAll({
        page: '1',
      });
      expect(result).toBeInstanceOf(GetAllArticlesResponseDto);
    });

    it('Method findAll must be called with correct parameters', async () => {
      await articlesController.findAll({
        page: '1',
        limit: '10',
      });

      expect(mockArticlesService.findAll).toHaveBeenCalledWith({
        query: {
          page: '1',
          limit: '10',
        },
      });
    });
  });
});
