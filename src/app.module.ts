import { Module } from '@nestjs/common';
import { DbModule } from './db.module';
import { TicketsController } from './tickets/tickets.controller';

@Module({
  imports: [DbModule],
  controllers: [TicketsController],
  providers: [],
})
export class AppModule {}
