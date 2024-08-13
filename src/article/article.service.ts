// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schemas
import Article from './article.schema';
import User from 'src/user/user.schema';

// dto's
import {
  CreateArticleDto,
  GetAllQueryArticlesDto,
  PatchArticleDto,
} from './dto';

// types
import { IArticle } from './article.types';
import { IPaginationResponse } from 'src/shared/types';
import Reaction from 'src/reaction/reaction.schema';
import Comment from 'src/comment/comment.schema';

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
        '🚀 ~ file: article.service.ts:66 ~ ArticlesService ~ err:',
        err,
      );
      throw err;
    }
  }

  async findAll({
    query,
  }: {
    query: GetAllQueryArticlesDto;
  }): Promise<IPaginationResponse<IArticle[]>> {
    const result = await this.articleModel.findAndCountAll({
      where: query.toWhereOption(),
      ...query.toPaginationOptions(),
      include: [
        { model: User, as: 'author' },
        { model: Reaction, as: 'reactions' },
        { model: Comment, as: 'comments' },
      ],
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
    try {
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
    } catch (err) {
      console.log(
        '🚀 ~ file: article.service.ts:125 ~ ArticlesService ~ err:',
        err,
      );
      throw err;
    }
  }

  async deleteById({
    userId,
    articleId,
  }: {
    userId: string;
    articleId: string;
  }) {
    try {
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
    } catch (err) {
      console.log(
        '🚀 ~ file: article.service.ts:159 ~ ArticlesService ~ err:',
        err,
      );
      throw err;
    }
  }
  async findOne({ articleId }: { articleId: string }) {
    return this.articleModel.findOne({
      where: {
        id: articleId,
      },
    });
  }
}
