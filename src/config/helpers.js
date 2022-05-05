"use strict";
exports.__esModule = true;
exports.CONLOG = exports.DIRNAME = void 0;
var path_1 = require("path");
// FUNCTIONS HELPERS:
// * DIRNAME shorthand helper function:
function DIRNAME(path) {
    return (0, path_1.join)(__dirname, "".concat(path));
}
exports.DIRNAME = DIRNAME;
// * Console.log shorthand helper function:
function CONLOG(params) {
    return console.log(params);
}
exports.CONLOG = CONLOG;
