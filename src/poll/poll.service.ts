import { Injectable } from '@nestjs/common';
import * as config from '../config/keys';

@Injectable()
export class PollService {
    Twitter: any;
    client: any;
    params: any;
    constructor() {
        this.Twitter = require('twitter');
        this.client = new this.Twitter({
            consumer_key: config.default.consumer_key,
            consumer_secret: config.default.consumer_secret,
            access_token_key: config.default.access_token_key,
            access_token_secret: config.default.access_token_secret
        })

        this.params = { screen_name: config.default.homeTimelineScreenName, count: '1' };
    }

    startPoll(): string {
        return 'Starting Poll!';
    }

    stopPoll(): string {
        return 'Stopping Poll!';
    }

    poll(): void {
        this.client.get('statuses/user_timeline', this.params, function (error, tweets, response) {
            if (!error) {
                console.log(tweets[0].text);
            } else {
                console.log('Error: ' + error);
            }
        })
    }
}
