// nest
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schemas
import Article from './article.schema';
import User from 'src/users/user.schema';

// dto's
import {
  DetailedArticlePresenter,
  ArticlePresenter,
  CreateArticleDto,
  GetAllArticlesDto,
  PatchArticleDto,
  GetAllArticlesPresenter,
  GetAllArticlesOptions,
} from './dto';

// types
import Reaction from 'src/reactions/reaction.schema';
import Comment from 'src/comments/comment.schema';
import { IArticle } from './article.types';

// constants
import { vocabulary } from 'src/shared';

const {
  article: { NOT_AUTHOR_OF_ARTICLE: NOT_AUTHOR, ARTICLE_NOT_FOUND: NOT_FOUND },
} = vocabulary;

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article) readonly articleModel: typeof Article) {}

  create({
    authorId,
    createArticleDto,
  }: {
    authorId: string;
    createArticleDto: CreateArticleDto;
  }): Promise<ArticlePresenter> {
    const article = {
      ...createArticleDto,
      authorId,
    };
    return this.articleModel.create(article);
  }

  async getById(articleId: string): Promise<DetailedArticlePresenter | null> {
    const article = await this.articleModel.findOne({
      where: { id: articleId },
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

    if (!article) return null;

    return new DetailedArticlePresenter(article);
  }

  async findAll(query: GetAllArticlesDto): Promise<GetAllArticlesPresenter> {
    const dto = new GetAllArticlesOptions(query);
    const result = await this.articleModel.findAndCountAll({
      where: dto.toWhereOption(),
      ...dto.toPaginationOptions(),
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
      distinct: true,
    });

    return new GetAllArticlesPresenter(result.rows, result.count);
  }

  async patch({
    articleId,
    userId,
    patchArticleDto,
  }: {
    articleId: string;
    userId: string;
    patchArticleDto: PatchArticleDto;
  }): Promise<ArticlePresenter> {
    const article = (await this.findOne({
      id: articleId,
    })) as Article;

    const articleAuthor = await this.findOne({
      id: articleId,
      authorId: userId,
    });

    if (!articleAuthor) {
      throw new NotFoundException(NOT_AUTHOR);
    }

    article.set(patchArticleDto);

    const updatedArticle = await article.save();

    return updatedArticle;
  }

  async delete({
    userId,
    articleId,
  }: {
    userId: string;
    articleId: string;
  }): Promise<void> {
    await this.findOne({
      id: articleId,
    });

    const articleAuthor = await this.findOne({
      id: articleId,
      authorId: userId,
    });

    if (!articleAuthor) {
      throw new NotFoundException(NOT_AUTHOR);
    }

    await this.articleModel.destroy({
      where: {
        id: articleId,
      },
    });
  }

  async findOne(whereCondition: Partial<IArticle>): Promise<Article | void> {
    const article = await this.articleModel.findOne({
      where: whereCondition,
    });

    if (!article) {
      throw new NotFoundException(NOT_FOUND);
    }

    return article;
  }
}
