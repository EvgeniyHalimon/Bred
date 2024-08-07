// nest
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schema
import { Article } from './schema/article.schema';

// dto
import { CreateArticleDto } from './dto/create-article.dto';
import { IUser } from 'src/user/interfaces/user.interfaces';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article) private articleModel: typeof Article) {}

  async create({
    user,
    createArticleDto,
  }: {
    user: IUser;
    createArticleDto: CreateArticleDto;
  }): Promise<Article> {
    try {
      const article = {
        title: createArticleDto.title,
        text: createArticleDto.text,
        authorId: user.id,
      };
      const createdArticle = await this.articleModel.create(article);
      return createdArticle;
    } catch (err) {
      console.log(
        '🚀 ~ file: articles.service.ts:33 ~ ArticlesService ~ create ~ err:',
        err,
      );
      throw err;
    }
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.findAll();
  }
}
