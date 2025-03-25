import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Company } from './Company';
import { User } from './User';

export enum TicketStatus {
  open = 'open',
  resolved = 'resolved',
}

export enum TicketType {
  managementReport = 'managementReport',
  registrationAddressChange = 'registrationAddressChange',
}

export enum TicketCategory {
  accounting = 'accounting',
  corporate = 'registrationAddressChange',
  management = 'management',
}

@Table({ tableName: 'tickets' })
export class Ticket extends Model {
  @Column
  type: TicketType;

  @Column
  status: TicketStatus;

  @Column
  category: TicketCategory;

  @ForeignKey(() => Company)
  companyId: number;

  @ForeignKey(() => User)
  assigneeId: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsTo(() => User)
  assignee: User;
}
