import { Body, Controller, Inject } from '@nestjs/common';
import { AppService } from '../app.service';
import { ZBClient } from 'zeebe-node';
import { CompleteFn, Job } from 'zeebe-node/interfaces';
import { ZEEBE_CONNECTION_PROVIDER, ZeebeWorker } from 'nestjs-zeebe';
    import {
        Ctx,
        Payload,
    } from '@nestjs/microservices';

const LIMIT_CARD = 500;

    @Controller()
    export class PaymentController {
        constructor(@Inject(ZEEBE_CONNECTION_PROVIDER) private readonly zbClient: ZBClient, private readonly appService: AppService) {}

        @ZeebeWorker('efetuar-transacao-pagamento')
        paymentCreateService(@Payload() job: Job, @Ctx() complete: CompleteFn<any>) {
          let transactionStatus = "COMMITED"
  
          if(job.variables.data.product.total > LIMIT_CARD){
            transactionStatus = "FAILED"              
          }
          complete.success(Object.assign({}, job.variables, {
            transactionStatus
          }));
        }

        @ZeebeWorker('cancelar-transacao-pagamento')
        paymentCancelService(@Payload() job: Job, @Ctx() complete: CompleteFn<any>) {
          const transactionStatus = "CANCELED"
          complete.success(Object.assign({}, job.variables, {
            transactionStatus
          }));
        }

    }