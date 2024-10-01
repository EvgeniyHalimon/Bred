import { Test } from '@nestjs/testing';
import { ArticlesController } from '../article.controller';
import { ArticlesService } from '../article.service';
import { ICustomRequest, vocabulary } from 'src/shared';
import {
  ArticlePresenter,
  DetailedArticlePresenter,
  GetAllArticlesPresenter,
} from '../dto';
import Article from '../article.schema';

const {
  article: { SUCCESSFUL_DELETE_OF_ARTICLE: SUCCESSFUL_DELETE },
} = vocabulary;

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

  const article = {
    id: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
    title: 'Big boss',
    rating: 0,
    authorId: 'd0601328-1486-434a-860e-75b843a682db',
    text: 'Man who sold the world',
    createdAt: '2024-08-16T15:59:48.000Z',
    updatedAt: '2024-08-16T16:00:02.000Z',
  } as unknown as Article;

  const articleDetailed = {
    ...article,
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
    reactions: [
      {
        id: '9ee920f3-f3a3-4892-86a8-191f2c303614',
        userId: 'd0601328-1486-434a-860e-75b843a682db',
        sourceType: 'article',
        articleId: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
        commentId: null,
        reactionType: 'upvote',
        createdAt: '2024-08-19T09:40:15.000Z',
        updatedAt: '2024-08-19T09:40:15.000Z',
        user: {
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
      },
    ],
    comments: [
      {
        id: '7770ec1a-cdbf-47c1-85db-35fbfc55d6a3',
        authorId: 'd0601328-1486-434a-860e-75b843a682db',
        articleId: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
        text: 'cool',
        createdAt: '2024-08-19T09:40:25.000Z',
        updatedAt: '2024-08-19T09:40:25.000Z',
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
      },
    ],
  } as unknown as Article;

  describe('Create method', () => {
    it('Create method must be called with correct parameters', async () => {
      await articlesController.create(req, createArticleDto);
      expect(mockArticlesService.create).toHaveBeenCalledWith({
        authorId: '1',
        createArticleDto,
      });
    });
  });

  describe('Delete method', () => {
    it('Delete must be called', async () => {
      const result = await articlesController.delete(req, articleId);

      expect(result).toEqual({ message: SUCCESSFUL_DELETE });
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
      const mockArticle = new ArticlePresenter(article);
      jest.spyOn(mockArticlesService, 'patch').mockResolvedValue(mockArticle);
      const result = await articlesController.patch(
        req,
        patchArticleDto,
        articleId,
      );

      expect(result).toBeInstanceOf(ArticlePresenter);
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
      const mockResult = new DetailedArticlePresenter(articleDetailed);
      jest.spyOn(mockArticlesService, 'getById').mockResolvedValue(mockResult);
      const result = await articlesController.getById(articleId);
      expect(result).toBeInstanceOf(DetailedArticlePresenter);
    });

    it('Method get must be call with correct parameters', async () => {
      await articlesController.getById(articleId);
      expect(mockArticlesService.getById).toHaveBeenCalledWith({ articleId });
    });
  });

  describe('FindAll method', () => {
    it('Method findAll must be called and should return instance of response dto', async () => {
      const mockResult = new GetAllArticlesPresenter([articleDetailed], 1);
      jest.spyOn(mockArticlesService, 'findAll').mockResolvedValue(mockResult);

      const result = await articlesController.findAll({
        page: '1',
      });
      expect(result).toBeInstanceOf(GetAllArticlesPresenter);
    });

    it('Method findAll must be called with correct parameters', async () => {
      await articlesController.findAll({
        page: '1',
        limit: '10',
      });

      expect(mockArticlesService.findAll).toHaveBeenCalledWith({
        page: '1',
        limit: '10',
      });
    });
  });
});
