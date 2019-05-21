import { Injectable } from '@nestjs/common';

@Injectable()
export class PollService {

  startPoll(): string {
    return 'Starting Poll!';
  }

  stopPoll(): string {
    return 'Stopping Poll!';
  }
}
