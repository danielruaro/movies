import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                }
            }
        })
    }

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
