import { Controller, Get } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller('producers')
export class ProducerController {
    constructor(private readonly producerService: ProducerService) { }

    @Get('awards-interval')
    getProducerWithHighestInterval() {
        return this.producerService.getProducerWithHighestInterval();
    }

}