import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { User } from './User';

@Table({ tableName: 'companies' })
export class Company extends Model {
  @Column
  name: string;

  @HasMany(() => User)
  users: User[];
}
