import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {

    async onModuleInit() {
        await this.$connect();
        await this.cleanDatabase();

    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async cleanDatabase() {
        const deleteMovies = this.movie.deleteMany();
        const deleteProducers = this.producer.deleteMany();
        const deleteStudios = this.studio.deleteMany();

        await this.$transaction([deleteMovies, deleteProducers, deleteStudios]);
    }
}
