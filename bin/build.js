const shell = require('shelljs');
const path = require('path');
const del = require('del');

console.log('正在删除目录');
del.sync([path.join(__dirname + '/../dist/**')]);

shell.exec('webpack --config ./webpack.prod.config', { async: true }, (code, stdout, stderr) => {});
