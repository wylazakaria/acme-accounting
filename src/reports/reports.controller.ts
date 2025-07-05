import { Controller, Get, Post, HttpCode } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('api/v1/reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  report() {
    return {
      'accounts.csv': this.reportsService.state('accounts'),
      'yearly.csv': this.reportsService.state('yearly'),
      'fs.csv': this.reportsService.state('fs'),
    };
  }

  @Post('accounts')
  @HttpCode(201)
  async accounts() {
    this.reportsService.accounts();
    return { message: 'finished' };
  }

  @Post('yearly')
  async yearly() {
    this.reportsService.yearly();
    return { message: 'finished' };
  }

@Post('fs')
  async fs() {
    this.reportsService.fs();
    return { message: 'finished' };
  }
}
