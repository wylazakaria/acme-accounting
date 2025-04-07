import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/reports')
export class ReportsController {
  @Get()
  async start() {
    return { status: 'starting' };
  }
}
