import path from 'path';

// * DIRNAME shorthand helper function:
function DIRNAME(routePath = '') {
    path.join(__dirname, `${routePath}`);
}

// * Console.log shorthand helper function:
function CONLOG(...params) {
    return console.log(...params);
}

export { DIRNAME, CONLOG };
