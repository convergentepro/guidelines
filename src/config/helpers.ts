import { join } from 'path';

// FUNCTIONS HELPERS:

// * DIRNAME shorthand helper function:
function DIRNAME(path: string) {
	return join(__dirname, `${path}`);
}

// * Console.log shorthand helper function:
function CONLOG(...params: any[]) {
    return console.log(...params);
}

export { DIRNAME, CONLOG };
