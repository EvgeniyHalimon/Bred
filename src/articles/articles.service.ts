// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schema
import { Article } from './schema/article.schema';

// dto's
import { CreateArticleDto, PatchArticleDto } from './dto';

// types
import { IUser } from 'src/user/interfaces/user.interfaces';
import { IArticle } from './interfaces/article.interfaces';
import {
  ISimpleResponse,
  IMessageResponse,
  ISimpleMessageResponse,
} from 'src/shared/types';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article) private articleModel: typeof Article) {}

  async create({
    user,
    createArticleDto,
  }: {
    user: IUser;
    createArticleDto: CreateArticleDto;
  }): Promise<IMessageResponse<IArticle>> {
    try {
      const article = {
        title: createArticleDto.title,
        text: createArticleDto.text,
        authorId: user.id,
      };
      const createdArticle = await this.articleModel.create(article);
      return {
        data: { article: createdArticle.dataValues },
        message: `Article "${createArticleDto.title}" created successfully`,
      };
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
  }): Promise<ISimpleResponse<IArticle> | undefined> {
    try {
      const article = await this.articleModel.findOne({
        where: { id: articleId },
      });

      if (!article) {
        throw new NotFoundException('Article not found');
      }

      return { data: { article } };
    } catch (err) {
      console.log(
        '🚀 ~ file: articles.service.ts:58 ~ ArticlesService ~ err:',
        err,
      );
    }
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.findAll();
  }

  async patchById({
    articleId,
    userId,
    patchArticleDto,
  }: {
    articleId: string;
    userId: string;
    patchArticleDto: PatchArticleDto;
  }): Promise<IMessageResponse<IArticle> | undefined> {
    const article = await this.articleModel.findOne({
      where: { id: articleId },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const articleAuthor = await this.articleModel.findOne({
      where: { authorId: userId },
    });

    if (!articleAuthor) {
      throw new NotFoundException('You are not author of this article');
    }

    Object.assign(article, patchArticleDto);

    const updatedArticle = await article.save();

    if (!updatedArticle) {
      throw new BadRequestException(
        'Something went wrong while updating the article',
      );
    }

    return {
      data: {
        article: updatedArticle,
      },
      message: `Article "${updatedArticle.title}" updated successfully`,
    };
  }

  async deleteById({
    userId,
    articleId,
  }: {
    userId: string;
    articleId: string;
  }): Promise<ISimpleMessageResponse> {
    const article = await this.articleModel.findOne({
      where: { id: articleId },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const articleAuthor = await this.articleModel.findOne({
      where: { authorId: userId },
    });

    if (!articleAuthor) {
      throw new NotFoundException('You are not author of this article');
    }

    const deletedArticle = await this.articleModel.destroy({
      where: {
        id: articleId,
      },
    });
    if (!deletedArticle) {
      throw new BadRequestException(
        'Something went wrong while deleting the article',
      );
    }
    return {
      message: `Article "${article.title}" deleted successfully`,
    };
  }
}
