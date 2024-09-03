import { Test } from '@nestjs/testing';
import { ArticlesController } from '../article.controller';
import { ArticlesService } from '../article.service';

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

  describe('Create method', () => {});
  describe('Delete method', () => {});
  describe('Patch method', () => {});
  describe('GetById method', () => {});
  describe('FindAll method', () => {});
});
