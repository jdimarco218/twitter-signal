import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
    buy() {
        return 'Buy!';
    }
}
