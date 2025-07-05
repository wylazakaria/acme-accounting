import { BadRequestException, Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { Company } from '../../db/models/Company';
import {
  Ticket,
  TicketCategory,
  TicketStatus,
  TicketType,
} from '../../db/models/Ticket';
import { User, UserRole } from '../../db/models/User';

interface newTicketDto {
  type: TicketType;
  companyId: number;
}

interface TicketDto {
  id: number;
  type: TicketType;
  companyId: number;
  assigneeId: number;
  status: TicketStatus;
  category: TicketCategory;
}

@Controller('api/v1/tickets')
export class TicketsController {
  @Get()
  async findAll() {
    return await Ticket.findAll({ include: [Company, User] });
  }

  @Post()
  async create(@Body() newTicketDto: newTicketDto) {
    const { type, companyId } = newTicketDto;

    const category = this.setTicketConfig(type);

    const assignee = await this.findAssignee(companyId, type);

    if (type === TicketType.registrationAddressChange) {
      const existingTicket = await Ticket.findOne({
        where: {
          type: TicketType.registrationAddressChange,
          companyId: companyId,
          status: TicketStatus.open
        }
      });

      if (existingTicket) {
        throw new ConflictException(`Duplicate ${TicketType.registrationAddressChange} ticket exist`);
      }
    }

    if (type === TicketType.strikeOff) {
      await this.resolveOtherTicket(companyId);
    }

    const ticket = await Ticket.create({
      companyId,
      assigneeId: assignee!!.id,
      category,
      type,
      status: TicketStatus.open,
    });

    const ticketDto: TicketDto = {
      id: ticket.id,
      type: ticket.type,
      assigneeId: ticket.assigneeId,
      status: ticket.status,
      category: ticket.category,
      companyId: ticket.companyId,
    };

    return ticketDto;
  }

  private setTicketConfig(type: TicketType): TicketCategory {
    switch (type) {
      case TicketType.managementReport:
        return TicketCategory.accounting
      case TicketType.registrationAddressChange:
        return TicketCategory.corporate
      case TicketType.strikeOff:
        return TicketCategory.management
      default:
        return TicketCategory.accounting
    }
  }

  private async findAssignee(companyId: number, type: TicketType): Promise<User | null> {
    if (type === TicketType.managementReport) {
      const accountant = await this.findSingleUser(companyId, UserRole.accountant);
      if (!accountant) {
        throw new ConflictException(
          `Cannot find assignee for ${type}`
        );
      }
      return accountant;
    }

    if (type === TicketType.strikeOff) {
      const directors = await this.findUser(companyId, UserRole.director);

      if (!directors || directors.length === 0) {
        throw new ConflictException(
          `Cannot find assignee for ${type}`
        );
      }

      return this.validateSingleAssignee(directors, type);
    }

    const secretaries = await this.findUser(companyId, UserRole.corporateSecretary);

    if (!secretaries || secretaries.length === 0) {
      const directors = await this.findUser(companyId, UserRole.director);

      if (!directors || directors.length === 0) {
        throw new ConflictException(
          `Cannot find assignee for ${type}`
        );
      }

      return this.validateSingleAssignee(directors, type);
    }

    return this.validateSingleAssignee(secretaries, type);
  }

  async findSingleUser(companyId: number, userRole: UserRole): Promise<User | null> {
    return await User.findOne({
      where: { companyId, role: userRole },
      order: [['createdAt', 'DESC']],
    });
  }

  async findUser(companyId: number, userRole: UserRole): Promise<User[] | null> {
    return await User.findAll({
      where: { companyId, role: userRole },
      order: [['createdAt', 'DESC']],
    });
  }

  validateSingleAssignee(users: User[], type: TicketType): User {
    if (users.length > 1) {
      throw new ConflictException(
        `Duplicate Assignee for ${type} tickets`
      );
    }
    return users[0];
  }

  async resolveOtherTicket(companyId: number) {
    await Ticket.update({
      status: TicketStatus.resolved
    }, {
      where: {
        companyId, status: TicketStatus.open
      }
    });
  }
}

