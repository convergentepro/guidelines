import {config} from 'dotenv';
import path from 'path';
config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const NODE_PORT = process.env.PORT || 3000;
export const NODE_HOST = process.env.HOST || 'http://localhost';

// * DIRNAME shorthand helper function:
export function DIRNAME(routePath = '') {
    path.join(__dirname, `${routePath}`);
}

// * Console.log shorthand helper function:
export function CONLOG(...params) {
    return console.log(...params);
}
