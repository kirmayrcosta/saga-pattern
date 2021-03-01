import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZeebeServer } from 'nestjs-zeebe';

async function bootstrap() {
const app = await NestFactory.create(AppModule);
app.connectMicroservice({
    strategy: app.get(ZeebeServer),
});

await app.startAllMicroservicesAsync();

await app.listen(3000);
}
bootstrap();