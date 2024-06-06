import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';

describe('ProducerController (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    jest.setTimeout(100000)

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        prisma = app.get<PrismaService>(PrismaService);

        await app.init();
    });


    afterAll(async () => {
        await app.close();
    });

    it('/producers/awards-interval (GET)', async () => {
        const expectedResponse = {
            "max": [
                {
                    "followingWin": 2015,
                    "interval": 13,
                    "previousWin": 2002,
                    "producer": "Matthew Vaughn",
                },
            ],
            "min": [
                {
                    "followingWin": 1991,
                    "interval": 1,
                    "previousWin": 1990,
                    "producer": "Joel Silver",
                },
            ],
        };

        const response = await request(app.getHttpServer())
            .get('/producers/awards-interval')
            .expect(200);

        expect(response.body).toEqual(expectedResponse);
    });
});