import { Module } from '@nestjs/common';
import { OrderController,InventoryController,NotificationController,PaymentController } from './controller';
import { AppService } from './app.service';
import { ZeebeModule, ZeebeServer } from 'nestjs-zeebe';

@Module({
  imports: [ ZeebeModule.forRoot({ gatewayAddress: 'localhost:26500' })],
  controllers: [OrderController,InventoryController,NotificationController,PaymentController],
  providers: [ZeebeServer, AppService],
  })
export class AppModule {}
