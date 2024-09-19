// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  PatchArticleDto,
} from './dto';

// types
import Reaction from 'src/reactions/reaction.schema';
import Comment from 'src/comments/comment.schema';
import { IArticle } from './article.types';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article) private articleModel: typeof Article) {}

  async create({
    userId,
    createArticleDto,
  }: {
    userId: string;
    createArticleDto: CreateArticleDto;
  }): Promise<ArticleDto> {
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
  }): Promise<DetailedArticleInfoDto | undefined> {
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

    return article as unknown as DetailedArticleInfoDto;
  }

  async findAll({
    query,
  }: {
    query: GetAllQueryArticlesDto;
  }): Promise<GetAllArticlesResponseDto> {
    /* BUG with count  */
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

  async delete({
    userId,
    articleId,
  }: {
    userId: string;
    articleId: string;
  }): Promise<void> {
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

  async findOne(whereCondition: Partial<IArticle>): Promise<ArticleDto | null> {
    return this.articleModel.findOne({
      where: whereCondition,
    });
  }
}
