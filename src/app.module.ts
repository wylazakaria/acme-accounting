import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TicketsController } from './tickets/tickets.controller';
import dbConfig from '../db/config/config.json';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...dbConfig,
      models: [],
    }),
  ],
})
@Module({
  imports: [],
  controllers: [TicketsController],
  providers: [],
})
export class AppModule {}
