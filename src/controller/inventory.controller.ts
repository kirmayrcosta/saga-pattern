import {  Controller,Inject } from '@nestjs/common';
import { ZBClient } from 'zeebe-node';
import { CompleteFn, Job } from 'zeebe-node/interfaces';
import { ZEEBE_CONNECTION_PROVIDER, ZeebeWorker } from 'nestjs-zeebe';
    import {
        Ctx,
        Payload,
    } from '@nestjs/microservices';
const INVENTORY_LIMIT = 5;
    @Controller()
    export class InventoryController {
        constructor(@Inject(ZEEBE_CONNECTION_PROVIDER) private readonly zbClient: ZBClient) {}

        @ZeebeWorker('criar-reserva-produto')
        inventoryCreateService(@Payload() job: Job, @Ctx() complete: CompleteFn<any>) {
          let inventoryStatus = "COMMITED"

          if(job.variables.data.product.total > INVENTORY_LIMIT){
            inventoryStatus = "FAILED"              
          }
          complete.success(Object.assign({}, job.variables, {
            inventoryStatus
          }));
        }
        
        @ZeebeWorker('cancelar-reserva-produto')
        inventoryCancelService(@Payload() job: Job, @Ctx() complete: CompleteFn<any>) {
          const inventoryStatus = "CANCELED"
          
          complete.success(Object.assign({}, job.variables, {
            inventoryStatus
          }));
        }

      }