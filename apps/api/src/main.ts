import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TestDto } from '@opencourser/interfaces';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);

  const seomthing: TestDto = { id: 123, name: 'sadas' };
}
bootstrap();
