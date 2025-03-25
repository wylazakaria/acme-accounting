import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeModuleOptions } from '@nestjs/sequelize/dist/interfaces/sequelize-options.interface';
import { Company } from '../db/models/Company';
import { Ticket } from '../db/models/Ticket';
import { User } from '../db/models/User';
import { TicketsController } from './tickets/tickets.controller';
import dbConfig from '../db/config/config.json';

console.log('dbConfig', dbConfig);

const devConfig = dbConfig.development as SequelizeModuleOptions;

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...devConfig,
      models: [Company, User, Ticket],
    }),
  ],
})
@Module({
  imports: [],
  controllers: [TicketsController],
  providers: [],
})
export class AppModule {}
