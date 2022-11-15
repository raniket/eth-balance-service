import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from './common/logger/logger.service'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new Logger(),
    });

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    
    const config = app.get(ConfigService);
    const PORT = config.get<number>('PORT');
    
    await app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    });
}

bootstrap();
