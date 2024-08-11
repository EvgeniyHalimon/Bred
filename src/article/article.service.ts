// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schemas
import { Article } from './article.schema';
import { User } from 'src/user/user.schema';

// dto's
import { CreateArticleDto, PatchArticleDto } from './dto';

// types
import { IArticle, IQueryFindAllArticles } from './article.types';
import { IPaginationResponse } from 'src/shared/types';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article) private articleModel: typeof Article) {}

  async create({
    userId,
    createArticleDto,
  }: {
    userId: string;
    createArticleDto: CreateArticleDto;
  }): Promise<IArticle> {
    try {
      const article = {
        ...createArticleDto,
        authorId: userId,
      };
      return await this.articleModel.create(article);
    } catch (err) {
      console.log(
        '🚀 ~ file: articles.service.ts:33 ~ ArticlesService ~ create ~ err:',
        err,
      );
      throw err;
    }
  }

  async getById({
    articleId,
  }: {
    articleId: string;
  }): Promise<IArticle | undefined> {
    try {
      const article = await this.articleModel.findOne({
        where: { id: articleId },
        include: [{ model: User, as: 'author' }],
      });

      if (!article) {
        throw new NotFoundException('Article not found');
      }

      return article;
    } catch (err) {
      console.log(
        '🚀 ~ file: articles.service.ts:58 ~ ArticlesService ~ err:',
        err,
      );
    }
  }

  async findAll({
    queries,
  }: {
    queries: IQueryFindAllArticles;
  }): Promise<IPaginationResponse<IArticle[]>> {
    const whereCondition = queries.title ? { title: queries.title } : {};
    const result = await this.articleModel.findAndCountAll({
      where: whereCondition,
      limit: queries.limit,
      offset: queries.offset,
      order: [[queries.orderBy, queries.order]],
      include: [{ model: User, as: 'author' }],
    });
    return {
      data: {
        articles: result.rows,
      },
      count: result.count,
    };
  }

  async patchById({
    articleId,
    userId,
    patchArticleDto,
  }: {
    articleId: string;
    userId: string;
    patchArticleDto: PatchArticleDto;
  }): Promise<IArticle | undefined> {
    const article = await this.articleModel.findOne({
      where: { id: articleId },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const articleAuthor = await this.articleModel.findOne({
      where: { id: articleId, authorId: userId },
    });

    if (!articleAuthor) {
      throw new NotFoundException('You are not author of this article');
    }

    article.set(patchArticleDto);

    const updatedArticle = await article.save();

    return updatedArticle;
  }

  async deleteById({
    userId,
    articleId,
  }: {
    userId: string;
    articleId: string;
  }) {
    const article = await this.articleModel.findOne({
      where: { id: articleId },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const articleAuthor = await this.articleModel.findOne({
      where: { id: articleId, authorId: userId },
    });

    if (!articleAuthor) {
      throw new NotFoundException('You are not author of this article');
    }

    const deletedArticle = await this.articleModel.destroy({
      where: {
        id: articleId,
      },
    });
    if (deletedArticle === 0) {
      throw new BadRequestException(
        'Something went wrong while deleting the article',
      );
    }
  }
}
