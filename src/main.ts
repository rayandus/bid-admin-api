import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { config } from 'common/config';

async function bootstrap() {
  // Opted not to use @nestjs/mongoose for now
  await mongoose.connect(config.MONGO_DB_CONNSTR, {
    socketTimeoutMS: 0,
    keepAlive: true,
    retryWrites: false,
  });
  mongoose.connection.on('reconnectFailed', (err) => {
    console.error('Database reconnect failed', err);
  });
  mongoose.connection.on('error', (err) => {
    console.error('Unable to connect to database', err);
    process.exit(1);
  });

  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}
bootstrap();
