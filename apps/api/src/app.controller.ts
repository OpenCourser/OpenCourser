import { Body, Controller, Post } from '@nestjs/common';
import { TestDto, testValidationSchema } from '@opencourser/interfaces';

import { AppService } from './app.service';
import { Validation } from './infrastructure/pipes/validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/")
  @Validation(testValidationSchema)
  getHello(@Body() dto: TestDto): string {
    console.log(dto);
    return this.appService.getHello();
  }
}
