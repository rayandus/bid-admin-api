import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { config } from 'common/config';

const defaultPort = process.env.NODE_ENV === 'production' ? 8080 : process.env.PORT;
const port = defaultPort || 3000;

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

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(port);
}
bootstrap();
