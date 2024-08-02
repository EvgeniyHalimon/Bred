import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './schema/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article) private articleModel: typeof Article,
    private sequelize: Sequelize,
  ) {}

  async create(createUserDto: CreateArticleDto): Promise<Article> {
    try {
      const result = await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };

        const article = {
          title: createUserDto.title,
          text: createUserDto.text,
          authorId: createUserDto.authorId,
        };
        const createdArticle = await this.articleModel.create(
          article,
          transactionHost,
        );
        return createdArticle;
      });

      return result;
    } catch (err) {
      console.log('🚀 ~ UsersService ~ create ~ err:', err);
      throw err;
    }
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.findAll();
  }
}
