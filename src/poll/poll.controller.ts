import { Controller, Get } from '@nestjs/common';
import { PollService } from './poll.service';

@Controller('poll')
export class PollController {
    isPolling: boolean;
    constructor(private readonly pollService: PollService) {
        this.isPolling = false;
        var timer = setInterval(() => {
            if (this.isPolling) {
                this.pollService.poll();
            }
        }, 1100);
    }

    @Get('/start')
    startPoll(): string {
        console.log('Starting poll');
        this.isPolling = true;
        return this.pollService.startPoll();
    }

    @Get('/stop')
    stopPoll(): string {
        console.log('Stopping poll');
        this.isPolling = false;
        return this.pollService.stopPoll();
    }

}
