import { Controller, Get, Post, Body, Param } from '@nestjs/common';

interface GetCompanyParam {
  id: string;
}

@Controller('api/v1/companies')
export class CompaniesController {
  @Get(':id')
  get(@Param() params: GetCompanyParam) {
    return {
      id: params.id,
    };
  }
}
