module.exports = {
    presets: [
        ['@babel/preset-env', '@babel/runtime', {targets: {esmodules: true}}],
    ],
    plugins: [
        '@babel/plugin-proposal-function-bind',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        ['module-resolver', {alias: {}}],
    ],
};
