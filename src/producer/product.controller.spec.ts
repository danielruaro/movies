import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';

describe('ProducerController (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        prisma = app.get<PrismaService>(PrismaService);

        await app.init();
    });

    beforeEach(async () => {
        await prisma.cleanDatabase();

        await prisma.producer.create({
            data: {
                name: 'Producer 1',
                movies: {
                    create: [
                        { title: 'Movie 1', year: 2008, winner: true },
                        { title: 'Movie 2', year: 2009, winner: true },
                    ],
                },
            },
        });

        await prisma.producer.create({
            data: {
                name: 'Producer 2',
                movies: {
                    create: [
                        { title: 'Movie 3', year: 2018, winner: true },
                        { title: 'Movie 4', year: 2019, winner: true },
                    ],
                },
            },
        });

        await prisma.producer.create({
            data: {
                name: 'Producer 3',
                movies: {
                    create: [
                        { title: 'Movie 5', year: 1990, winner: true },
                        { title: 'Movie 6', year: 2000, winner: true },
                    ],
                },
            },
        });

        await prisma.producer.create({
            data: {
                name: 'Producer 4',
                movies: {
                    create: [
                        { title: 'Movie 7', year: 1992, winner: true },
                        { title: 'Movie 8', year: 2000, winner: true },
                    ],
                },
            },
        });
    });

    afterAll(async () => {
        await app.close();
    });

    it('/producers/awards-interval (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/producers/awards-interval')
            .expect(200);

        expect(response.body).toEqual({
            "max": [{
                "followingWin": 2000,
                "interval": 10,
                "previousWin": 1990,
                "producer": "Producer 3"
            }],
            "min": [
                {
                    "followingWin": 2009,
                    "interval": 1,
                    "previousWin": 2008,
                    "producer": "Producer 1"
                }, {
                    "followingWin": 2019,
                    "interval": 1,
                    "previousWin": 2018,
                    "producer": "Producer 2"
                }]
        });
    });

});