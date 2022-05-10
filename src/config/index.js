import {config} from 'dotenv';

// Settings:
config();

export const ENVIROMENT = process.env.NODE_ENV || 'development';
export const NODE_PORT = process.env.PORT || 3000;
export const NODE_HOST = process.env.HOST || 'http://localhost';
