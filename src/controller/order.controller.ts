import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ZBClient } from 'zeebe-node';
import {CreateOrdertDto} from '../dto/create-order.dto'
import { CompleteFn, Job } from 'zeebe-node/interfaces';
import { ZEEBE_CONNECTION_PROVIDER, ZeebeWorker } from 'nestjs-zeebe';
    import {
        Ctx,
        Payload,
    } from '@nestjs/microservices';
const BLACK_LIST = ["luciano"]
    @Controller()
    export class OrderController {
        constructor(@Inject(ZEEBE_CONNECTION_PROVIDER) private readonly zbClient: ZBClient) {}

        // Use the client to create a new workflow instance
        @Post("v1/order")
        getHello(@Body() body: CreateOrdertDto) : Promise<any> {
            console.log(body);
            return this.zbClient.createWorkflowInstance('teste', 
            {
              data: body,
              orderStatus: "NOT_ACTIVE",
              transactionStatus: "NOT_ACTIVE",
              inventoryStatus: "NOT_ACTIVE",
              notificationStatus: "NOT_ACTIVE"
            });
        }

        @ZeebeWorker('criar-ordem-pagamento')
        orderCreateService(@Payload() job: Job, @Ctx() complete: CompleteFn<any>) {
            let orderStatus = "COMMITED"
  
            if(BLACK_LIST.includes(job.variables.data.client.id)){
              orderStatus = "FAILED"              
            }
            complete.success(Object.assign({}, job.variables, {
              orderStatus: orderStatus
            }));
        }

        @ZeebeWorker('cancelar-ordem-pagamento')
        orderCancelService(@Payload() job: Job, @Ctx() complete: CompleteFn<any>) {

            complete.success(Object.assign({}, job.variables, {
              orderStatus: "CANCELED"
            }));
        }
    }