import { createReadStream } from 'fs';
import * as csv from 'csv-parser';


import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CsvService {
    constructor(private readonly prisma: PrismaService) { }

    async lerCSVInserirNoBancoDeDados(
        caminhoArquivo,
    ) {
        try {
            const stream = createReadStream(caminhoArquivo)
                .pipe(csv({ separator: ';' }))


            for await (const row of stream) {
                const producers = row.producers.split(
                    /(?:, |,|and )+/,

                );

                const studios = row.studios.split(
                    /(?:, |,|and )+/
                );

                const movie =
                    await this.prisma.movie.create({
                        data: {
                            title: row.title.replace(/\s+$/, ''),
                            year: +row.year,
                            winner: Boolean(row.winner),
                        },
                    });

                const mappedProducers = producers.map(producer => {
                    const producerName = producer.replace(/\s+$/, '')

                    return {
                        where: {
                            name: producerName
                        }, create: {
                            name: producerName,
                        }
                    }
                })

                const mappedStudios = studios.map(studio => {
                    const studioName = studio.replace(/\s+$/)
                    return {
                        where: {
                            name: studioName
                        }, create: {
                            name: studioName,
                        }
                    }
                })

                await this.prisma.movie.update({
                    where: { id: movie.id },
                    data: {
                        producers: {
                            connectOrCreate: mappedProducers,
                        },
                        studios: {
                            connectOrCreate: mappedStudios,
                        },
                    }
                })
            }

            console.log('Inserção de dados finalizado.')

        } catch (error) {
            console.error(
                'Erro ao ler o arquivo CSV:',
                error,
            );
        }
    }
}