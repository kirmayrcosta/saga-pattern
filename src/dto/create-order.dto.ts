import {Product} from "./product.dto"
import {Client} from "./client.dto"
export class CreateOrdertDto {
    client: Client;
    product: Product
  }