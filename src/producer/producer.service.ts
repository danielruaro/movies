import { Injectable } from '@nestjs/common';
import { Producer } from 'src/models/producer.model';
import { PrismaService } from '../prisma/prisma.service';



@Injectable()
export class ProducerService {
    constructor(private prisma: PrismaService) { }

    async getProducerWithHighestInterval(): Promise<any | null> {
        const allProducers = await this.prisma.producer.findMany({
            include: {
                movies: {
                    where: {
                        winner: true,
                    },
                    orderBy: {
                        year: 'asc',
                    },
                },
            },
        }) as unknown as Producer[];

        let producerWithHighestIntervalResults: { producer: string; interval: number; previousWin: number; followingWin: number }[] = [];
        let highestInterval = 0;

        let producerWithFastestTwoAwardsResults: { producer: string; interval: number; previousWin: number; followingWin: number }[] = [];
        let fastestInterval = Infinity;

        allProducers.forEach(producer => {
            const sortedMovies = producer.movies;

            for (let i = 0; i < sortedMovies.length - 1; i++) {
                const interval = sortedMovies[i + 1].year - sortedMovies[i].year;
                if (interval > highestInterval) {
                    highestInterval = interval;
                    producerWithHighestIntervalResults = [{
                        producer: producer.name,
                        interval,
                        previousWin: sortedMovies[i].year,
                        followingWin: sortedMovies[i + 1].year,
                    }];
                } else if (interval === highestInterval) {
                    producerWithHighestIntervalResults.push({
                        producer: producer.name,
                        interval,
                        previousWin: sortedMovies[i].year,
                        followingWin: sortedMovies[i + 1].year,
                    });
                }
                if (interval < fastestInterval) {
                    fastestInterval = interval;
                    producerWithFastestTwoAwardsResults = [{
                        producer: producer.name,
                        interval,
                        previousWin: sortedMovies[i].year,
                        followingWin: sortedMovies[1].year,
                    }];
                } else if (interval === fastestInterval) {
                    producerWithFastestTwoAwardsResults.push({
                        producer: producer.name,
                        interval,
                        previousWin: sortedMovies[i].year,
                        followingWin: sortedMovies[i + 1].year,
                    });
                }
            }
        });

        return { max: producerWithHighestIntervalResults, min: producerWithFastestTwoAwardsResults };
    }

}