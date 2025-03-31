import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Company } from './Company';

export enum UserRole {
  accountant = 'accountant',
  corporateSecretary = 'corporateSecretary',
}

@Table({ tableName: 'users' })
export class User extends Model {
  @Column
  name: string;

  @Column
  role: UserRole;

  @ForeignKey(() => Company)
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}
