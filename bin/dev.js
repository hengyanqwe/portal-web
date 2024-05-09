const shell = require('shelljs');
const path = require('path');
const del = require('del');

del.sync([path.join(__dirname + '/../devtmp/**')]);


// 开始编译
shell.exec('webpack serve --config webpack.config.js --open');
