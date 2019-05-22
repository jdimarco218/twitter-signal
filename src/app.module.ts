import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PollController } from './poll/poll.controller';
import { PollModule } from './poll/poll.module';
import { PollService } from './poll/poll.service';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';

@Module({
  imports: [PollModule],
  controllers: [AppController, PollController, OrdersController],
  providers: [AppService, PollService, OrdersService],
})
export class AppModule {}
