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
    const article = {
      ...createArticleDto,
      authorId: userId,
    };
    return await this.articleModel.create(article);
  }

  async getById({
    articleId,
  }: {
    articleId: string;
  }): Promise<IArticle | undefined> {
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
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async findAll({ query }: { query: GetAllQueryArticlesDto }) {
    const result = await this.articleModel.findAndCountAll({
      where: query.toWhereOption(),
      ...query.toPaginationOptions(),
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
    console.log(
      '🚀 ~ file: article.service.ts:89 ~ ArticlesService ~ findAll ~ result:',
      result,
    );
    return {
      articles: result.rows,
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
  async findOne({ articleId }: { articleId: string }) {
    return this.articleModel.findOne({
      where: {
        id: articleId,
      },
    });
  }
}
