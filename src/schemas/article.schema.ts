import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table
export class Article extends Model<Article> {
  @Column({ defaultValue: uuidv4(), primaryKey: true })
  id: string;

  @Column
  title: string;

  @Column({ defaultValue: 0 })
  rating: number;

  @Column
  author: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  upvotes: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  downvotes: string[];

  @Column({ defaultValue: '' })
  text: string;
}
