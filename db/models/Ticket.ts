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

@Table({ tableName: 'tickets' })
export class Ticket extends Model {
  @Column
  type: TicketType;

  @Column
  status: TicketStatus;

  @ForeignKey(() => Company)
  companyId: number;

  @ForeignKey(() => User)
  assigneeId: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsTo(() => User)
  assignee: User;
}
