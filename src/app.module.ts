import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CsvService } from './csv/csv.service';

import { ProducerModule } from './producer/producer.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), ProducerModule, PrismaModule],
  providers: [CsvService]
})



export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly csvService: CsvService) {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV !== 'test') {
      await this.csvService.lerCSVInserirNoBancoDeDados('./movielist.csv');
  }

  }
}