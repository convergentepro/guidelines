import { config } from 'dotenv';

config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_PORT = process.env.PORT || 3000;
const NODE_HOST = process.env.HOST || 'http://localhost';

export { NODE_ENV, NODE_PORT, NODE_HOST };
