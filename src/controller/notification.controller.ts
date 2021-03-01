import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { AppService } from '../app.service';
import {CreateOrdertDto} from '../dto/create-order.dto'
import { ZBClient } from 'zeebe-node';
import { CompleteFn, Job } from 'zeebe-node/interfaces';
import { ZEEBE_CONNECTION_PROVIDER, ZeebeWorker } from 'nestjs-zeebe';
    import {
        Ctx,
        Payload,
    } from '@nestjs/microservices';

    @Controller()
    export class NotificationController {
        constructor(@Inject(ZEEBE_CONNECTION_PROVIDER) private readonly zbClient: ZBClient, private readonly appService: AppService) {}

        @ZeebeWorker('notificar-cliente')
        notifyService(@Payload() job: Job, @Ctx() complete: CompleteFn<any>) {
          let notificationStatus = "COMPLETED"

          complete.success(Object.assign({}, job.variables, {
            notificationStatus
          }));
        }
    }