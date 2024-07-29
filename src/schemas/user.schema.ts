import { Column, Model, Table } from 'sequelize-typescript';
import { IUser } from 'src/modules/user/interfaces/user.interfaces';

@Table
export class User extends Model<IUser> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
