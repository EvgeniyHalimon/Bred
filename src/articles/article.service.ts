// nest
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schemas
import Article from './article.schema';
import User from 'src/users/user.schema';

// dto's
import {
  ArticleDto,
  CreateArticleDto,
  DetailedArticleInfoDto,
  GetAllArticlesResponseDto,
  GetAllQueryArticlesDto,
  GetByIdArticleResponseDto,
  PatchArticleDto,
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
  constructor(@InjectModel(Article) private articleModel: typeof Article) {}

  create({
    authorId,
    createArticleDto,
  }: {
    authorId: string;
    createArticleDto: CreateArticleDto;
  }): Promise<ArticleDto> {
    const article = {
      ...createArticleDto,
      authorId,
    };
    return this.articleModel.create(article);
  }

  async getById({
    articleId,
  }: {
    articleId: string;
  }): Promise<GetByIdArticleResponseDto | null> {
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

    return article as unknown as GetByIdArticleResponseDto;
  }

  async findAll(
    query: GetAllQueryArticlesDto,
  ): Promise<GetAllArticlesResponseDto> {
    const result = await this.articleModel.findAndCountAll({
      where: query.toWhereOption?.(),
      ...query.toPaginationOptions?.(),
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

    return {
      articles: result.rows as unknown as DetailedArticleInfoDto[],
      count: result.count,
    };
  }

  async patch({
    articleId,
    userId,
    patchArticleDto,
  }: {
    articleId: string;
    userId: string;
    patchArticleDto: PatchArticleDto;
  }): Promise<ArticleDto | undefined> {
    const article = (await this.articleModel.findOne({
      where: { id: articleId },
    })) as Article;

    const articleAuthor = await this.articleModel.findOne({
      where: { id: articleId, authorId: userId },
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
    await this.articleModel.findOne({
      where: { id: articleId },
    });

    const articleAuthor = await this.articleModel.findOne({
      where: { id: articleId, authorId: userId },
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

  async findOne(whereCondition: Partial<IArticle>): Promise<ArticleDto> {
    const article = await this.articleModel.findOne({
      where: whereCondition,
    });

    if (!article) {
      throw new NotFoundException(NOT_FOUND);
    }

    return article;
  }
}
