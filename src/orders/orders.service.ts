import { Injectable } from '@nestjs/common';
import * as config from '../config/keys';
const crypto = require('crypto');
const axios = require('axios');

@Injectable()
export class OrdersService {
    constructor() { }

    buy(symbol) {
        const baseTradeUrl = 'https://api.binance.com/api/v3/order/test';

        //
        // Create query string
        //
        const baseQueryString = `quantity=100&recvWindow=10000&symbol=${symbol}BTC&side=BUY&type=MARKET&timestamp=${(new Date).getTime()}`;
        const hmac = crypto.createHmac('sha256', config.default.binSecretKey);
        hmac.update(baseQueryString);
        const digest = hmac.digest('hex');
        const signatureParam = `&signature=${digest}`;
        const queryString = baseQueryString + signatureParam;

        const fullUrl = baseTradeUrl + '?' + queryString;

        console.log("POST to: " + fullUrl);
        return axios.post(fullUrl, null, {
            headers: {
                'X-MBX-APIKEY': config.default.binApiKey,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(res => {
            console.log("Post successful.");
            return res.status;
        }).catch(e => {
            console.log(e);
        });
    }
}
