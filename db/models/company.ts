import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Company extends Model {
  @Column
  name: string;
}
