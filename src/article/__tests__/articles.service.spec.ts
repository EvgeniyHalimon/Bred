import { Test } from '@nestjs/testing';
import { ArticlesService } from '../article.service';

import { getModelToken } from '@nestjs/sequelize';
import Article from '../article.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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

  describe('Create method', () => {
    it('should be called with correct parameters', async () => {
      await articlesService.create({ userId: '1', createArticleDto });
      expect(mockArticlesModel.create).toHaveBeenCalledWith({
        authorId: '1',
        ...createArticleDto,
      });
    });

    it('should return the created article when called with correct parameters', async () => {
      mockArticlesModel.create.mockResolvedValue(article);

      const result = await articlesService.create({
        userId: '1',
        createArticleDto,
      });

      expect(result).toEqual(article);
    });
  });

  describe('GetById method', () => {
    it('', () => {});
    it('', () => {});
  });

  describe('FindAll method', () => {});

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
        expect(error.message).toBe('Article not found');
      }
    });

    it('should throw NotFoundException if user are not author of this article', async () => {
      mockArticlesModel.findOne.mockResolvedValueOnce(article);
      mockArticlesModel.findOne.mockResolvedValueOnce(null);
      try {
        await deleteArticle();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('You are not author of this article');
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
    it('should successfully patch a article', async () => {});

    it('should throw NotFoundException if article not found', async () => {});

    it('should throw NotFoundException if user are not author of this article', async () => {});
  });

  describe('ArticlesService findOne method', () => {
    it('should return a article by id', async () => {
      const mockArticle = {
        id: '1',
        text: 'This is a article',
      };

      mockArticlesModel.findOne.mockResolvedValue(mockArticle);

      const result = await articlesService.findOne({
        id: mockArticle.id,
      });

      expect(mockArticlesModel.findOne).toHaveBeenCalledWith({
        where: { id: mockArticle.id },
      });

      expect(result).toEqual(mockArticle);
    });

    it('should return null if no user is found', async () => {
      mockArticlesModel.findOne.mockResolvedValue(null);

      const result = await articlesService.findOne({ id: '2' });

      expect(mockArticlesModel.findOne).toHaveBeenCalledWith({
        where: { id: '2' },
      });
      expect(result).toBeNull();
    });
  });
});
