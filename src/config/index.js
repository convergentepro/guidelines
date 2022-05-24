import {config} from 'dotenv';

// Settings:
config();

export const DEVELOPMENT = process.env.VITE_MODE || 'development';
export const PRODUCTION = !process.env.VITE_MODE || 'production';
export const PORT = Number(process.env.VITE_PORT) || 8000;
