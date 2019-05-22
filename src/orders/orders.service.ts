import { Injectable, HttpService } from '@nestjs/common';
import * as config from '../config/keys';
import { map } from 'rxjs/operators';
const crypto = require('crypto');
const axios = require('axios');

@Injectable()
export class OrdersService {
    constructor(private readonly httpService: HttpService) {}

    buy(symbol) {
        const baseTradeUrl = 'https://api.binance.com/api/v3/order/test?';
        const baseQueryString = `quantity=100&recvWindow=10000&symbol=${symbol}BTC&side=BUY&type=MARKET&timestamp=${(new Date).getTime()}`;
        const hmac = crypto.createHmac('sha256', config.default.binSecretKey);
        hmac.update(baseQueryString);
        const digest = hmac.digest('hex');
        const signatureParam = `&signature=${digest}`;
        const queryString = baseQueryString + signatureParam;

        const fullUrl = baseTradeUrl + queryString;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-MBX-APIKEY': config.default.binApiKey
        }

        console.log("POST to: " + fullUrl);
        console.log("headers: " + JSON.stringify(headers));
        return axios.post(fullUrl, {headers: headers}).then(res => {
            console.log("Post res: " + JSON.stringify(res));
        }).catch(e => {
            console.log("Error posting" + e);
            console.log("response: ",e.response.data);
        });
    }
}
