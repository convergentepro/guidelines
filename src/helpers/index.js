import path from 'path'

// * DIRNAME shorthand helper function:
export function DIRNAME (routePath = '') {
  return path.join(__dirname, `${routePath}`)
}

// * Console.log shorthand helper function:
export function CLOG (...params) {
  return console.log(...params)
}
