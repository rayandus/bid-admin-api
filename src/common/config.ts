import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'bid-admin-api',
  MONGO_DB_CONNSTR: process.env.MONGO_DB_CONNSTR || '',
  CURRENCY: 'USD',
};
