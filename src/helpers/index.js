import {join} from 'path';

// * DIRNAME shorthand helper function:
export function DIRNAME(routePath = '') {
    return join(__dirname, `${routePath}`);
}

// * Console.log shorthand helper function:
export function CLOG(...params) {
    return console.log(...params);
}
