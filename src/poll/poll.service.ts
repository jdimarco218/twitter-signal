import { Injectable } from '@nestjs/common';
import * as config from '../config/keys';

const allowed_tickers: string[] = config.default.allowed_tickers;

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

        this.params = { screen_name: config.default.homeTimelineScreenName, count: '1', since_id: config.default.since_id };
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
                if (tweets[0] && tweets[0].text) {
                    const tweet = tweets[0].text;
                    const ticker = tweet.slice(1, tweet.indexOf(' '));
                    if (allowed_tickers.indexOf(ticker) > -1 && tweet.indexOf('Buy') > -1) {
                        console.log("BUY SIGNAL!!!! [" + ticker + "]");
                    }
                } else {
                    console.log('No tweets.');
                }
            } else {
                console.log('Error: ' + error);
            }
        })
    }
}
