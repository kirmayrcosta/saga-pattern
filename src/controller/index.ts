import { Module } from "@nestjs/common";
import {InventoryController} from "./inventory.controller";
import {NotificationController} from "./notification.controller";
import {OrderController} from "./order.controller";
import {PaymentController} from "./payment.controller";

export  {
    InventoryController, NotificationController, OrderController ,PaymentController
};