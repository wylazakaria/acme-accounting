import { Module } from '@nestjs/common';
import { DbModule } from './db.module';
import { TicketsController } from './tickets/tickets.controller';
import { ReportsController } from './reports/reports.controller';
import { HealthcheckController } from './healthcheck/healthcheck.controller';

@Module({
  imports: [DbModule],
  controllers: [TicketsController, ReportsController, HealthcheckController],
  providers: [],
})
export class AppModule {}
