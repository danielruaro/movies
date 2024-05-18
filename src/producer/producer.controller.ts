import { Controller, Get } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller('producers')
export class ProducerController {
    constructor(private readonly producerService: ProducerService) { }

    @Get('awards-interval')
    getProducersInterval() {
        return this.producerService.getProducersInterval();
    }

}