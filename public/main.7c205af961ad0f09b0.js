"use strict";

console.log('Compilando archivo app.js');
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PRODUCTION = exports.PORT = exports.DEVELOPMENT = void 0;

var _dotenv = require("dotenv");

// Settings:
(0, _dotenv.config)();
const DEVELOPMENT = process.env.VITE_MODE || 'development';
exports.DEVELOPMENT = DEVELOPMENT;
const PRODUCTION = !process.env.VITE_MODE || 'production';
exports.PRODUCTION = PRODUCTION;
const PORT = Number(process.env.VITE_PORT) || 8000;
exports.PORT = PORT;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLOG = CLOG;
exports.DIRNAME = DIRNAME;

var _path = _interopRequireDefault(require("path"));

// * DIRNAME shorthand helper function:
function DIRNAME(routePath = '') {
  return _path.default.join(__dirname, `${routePath}`);
} // * Console.log shorthand helper function:


function CLOG(...params) {
  return console.log(...params);
}
//# sourceMappingURL=main.7c205af961ad0f09b0.js.map
