import {config} from 'dotenv';

// Settings:
config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const NODE_PORT = process.env.PORT || 3000;
// export const NODE_HOSTNAME = process.env.HOST || 'http://localhost';
export const WEBPACK_PORT = process.env.WEBPACK_PORT || 8000;
export const WEBPACK_HOSTNAME = process.env.WEBPACK_HOST || 'http://localhost';
