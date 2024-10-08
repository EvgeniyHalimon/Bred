import { Test } from '@nestjs/testing';
import { ArticlesService } from '../article.service';
import { getModelToken } from '@nestjs/sequelize';
import Article from '../article.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import Reaction from 'src/reactions/reaction.schema';
import User from 'src/users/user.schema';
import Comment from 'src/comments/comment.schema';
import { vocabulary } from 'src/shared';

const {
  article: { ARTICLE_NOT_FOUND: NOT_FOUND, NOT_AUTHOR_OF_ARTICLE: NOT_AUTHOR },
} = vocabulary;

describe('ArticlesService', () => {
  let articlesService: ArticlesService;
  let mockArticlesModel: {
    findOne: jest.Mock;
    findAndCountAll: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    set: jest.Mock;
    destroy: jest.Mock;
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getModelToken(Article),
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
    articlesService = moduleRef.get<ArticlesService>(ArticlesService);
    mockArticlesModel = moduleRef.get(getModelToken(Article));
  });

  it('should be defined', () => {
    expect(articlesService).toBeDefined();
  });

  const createArticleDto = {
    title: 'Big boss',
    text: 'Man who sold the world',
  };

  const article = {
    id: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
    title: 'Big boss',
    rating: 0,
    authorId: 'd0601328-1486-434a-860e-75b843a682db',
    text: 'Man who sold the world',
    createdAt: '2024-08-16T15:59:48.000Z',
    updatedAt: '2024-08-16T16:00:02.000Z',
  };

  const articleById = {
    id: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
    title: 'Big boss',
    rating: 0,
    authorId: 'd0601328-1486-434a-860e-75b843a682db',
    text: 'Man who sold the world',
    createdAt: '2024-08-16T15:59:48.000Z',
    updatedAt: '2024-08-16T16:00:02.000Z',
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
  };

  describe('Create method', () => {
    it('should be called with correct parameters', async () => {
      await articlesService.create({ authorId: '1', createArticleDto });
      expect(mockArticlesModel.create).toHaveBeenCalledWith({
        authorId: '1',
        ...createArticleDto,
      });
    });
  });

  describe('Delete method', () => {
    const deleteArticle = () => {
      return articlesService.delete({ userId: '1', articleId: '11' });
    };
    it('should successfully delete a article', async () => {
      mockArticlesModel.findOne.mockResolvedValue(article);
      await deleteArticle();
      expect(mockArticlesModel.destroy).toHaveBeenCalledWith({
        where: { id: '11' },
      });
    });

    it('should throw NotFoundException if article not found', async () => {
      mockArticlesModel.findOne.mockResolvedValue(null);
      try {
        await deleteArticle();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(NOT_FOUND);
      }
    });

    it('should throw NotFoundException if user are not author of this article', async () => {
      jest
        .spyOn(articlesService, 'findOne')
        .mockResolvedValueOnce(article as any);

      jest.spyOn(articlesService, 'findOne').mockResolvedValueOnce();
      try {
        await deleteArticle();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(NOT_AUTHOR);
      }
    });

    it('should throw BadRequestException if article not found', async () => {
      mockArticlesModel.findOne.mockResolvedValue(article);
      try {
        await deleteArticle();
        mockArticlesModel.destroy.mockResolvedValue(0);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe(
          'Something went wrong while deleting the article',
        );
      }
    });
  });

  describe('Patch method', () => {
    const patchArticleDto = {
      title: 'Big boss',
    };

    const patchArticle = {
      articleId: '1',
      userId: '1',
      patchArticleDto,
    };

    it('should successfully patch a article', async () => {
      mockArticlesModel.findOne.mockResolvedValue({
        save: mockArticlesModel.save.mockResolvedValue(article),
        set: mockArticlesModel.set,
      });

      const result = await articlesService.patch({
        userId: '1',
        articleId: '1',
        patchArticleDto,
      });

      expect(mockArticlesModel.findOne).toHaveBeenCalledTimes(2);
      expect(mockArticlesModel.set).toHaveBeenCalledWith(patchArticleDto);
      expect(mockArticlesModel.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(article);
    });

    it('should throw NotFoundException if article not found', async () => {
      jest.spyOn(articlesService, 'findOne').mockResolvedValueOnce();

      try {
        await articlesService.patch(patchArticle);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(NOT_FOUND);
      }
    });

    it('should throw NotFoundException if user are not author of this article', async () => {
      jest
        .spyOn(articlesService, 'findOne')
        .mockResolvedValueOnce(patchArticle as any);

      jest.spyOn(articlesService, 'findOne').mockResolvedValueOnce();
      try {
        await articlesService.patch(patchArticle);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(NOT_AUTHOR);
      }
    });
  });

  describe('GetById method', () => {
    it('should get article by id', async () => {
      jest
        .spyOn(articlesService, 'findOne')
        .mockResolvedValue(articleById as any);
      await articlesService.getById('11');
      expect(mockArticlesModel.findOne).toHaveBeenCalledWith({
        where: { id: '11' },
        include: [
          { model: User, as: 'author' },
          {
            model: Reaction,
            as: 'reactions',
            include: [{ model: User, as: 'user' }],
          },
          {
            model: Comment,
            as: 'comments',
            include: [{ model: User, as: 'author' }],
          },
        ],
      });
    });

    it('should throw NotFoundException if comment not found', async () => {
      jest.spyOn(articlesService, 'findOne').mockResolvedValueOnce();
      try {
        await articlesService.getById('11');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(NOT_FOUND);
      }
    });
  });

  describe('FindAll method', () => {
    const mockArticles = {
      rows: [articleById] as unknown as Article[],
      count: 1,
    };

    it('should return articles and count', async () => {
      mockArticlesModel.findAndCountAll.mockResolvedValue(mockArticles);

      const articles = await articlesService.findAll({ page: '1' });

      expect(mockArticlesModel.findAndCountAll).toHaveBeenCalledTimes(1);

      expect(articles).toEqual({
        articles: mockArticles.rows,
        count: mockArticles.count,
      });
    });
  });

  describe('ArticlesService findOne method', () => {
    it('should return a article by id', async () => {
      mockArticlesModel.findOne.mockResolvedValueOnce(article as any);

      const result = await articlesService.findOne({
        id: article.id,
      });

      expect(mockArticlesModel.findOne).toHaveBeenCalledWith({
        where: { id: article.id },
      });

      expect(result).toEqual(article);
    });

    it('should throw NotFoundException if no article is found', async () => {
      mockArticlesModel.findOne.mockResolvedValue(null);

      try {
        await articlesService.findOne({ id: '2' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(NOT_FOUND);
      }

      expect(mockArticlesModel.findOne).toHaveBeenCalledWith({
        where: { id: '2' },
      });
    });
  });
});
