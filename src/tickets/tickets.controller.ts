import { Controller, Get } from '@nestjs/common';
import { Company } from '../../db/models/Company';
import { Ticket, TicketStatus, TicketType } from '../../db/models/Ticket';
import { User, UserRole } from '../../db/models/User';

@Controller('tickets')
export class TicketsController {
  @Get()
  async findAll() {
    const c = await Company.create({ name: 'c1' });
    const u = await User.create({
      name: 'u1',
      companyId: c.id,
      role: UserRole.manager,
    });
    await Ticket.create({
      type: TicketType.managementReport,
      status: TicketStatus.open,
      companyId: c.id,
      assigneeId: u.id,
    });
    return await Ticket.findAll({ include: [Company, User] });
  }
}
