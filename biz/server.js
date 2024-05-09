const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');
const app = new Koa();
const argv = require('yargs').argv;
const column = argv.env === 'dev' ? '../devtmp' : '../dist';
const port = argv.env === 'dev' ? 8087 : 8089;

app.listen(port);
app.use(koaStatic(path.resolve(__dirname, column)));


// 反向代理解决开发环境下的跨域
const express = require("express");
const {createProxyMiddleware} = require('http-proxy-middleware');
const proxyApp = express();
proxyApp.use("/api", createProxyMiddleware({
    target: 'http://localhost:8080',        // 后端服务地址
    changeOrigin: true,
}))
proxyApp.use("/services", createProxyMiddleware({
    target: 'http://localhost:8080',        // 后端Webservice服务地址
    changeOrigin: true,
}))
proxyApp.use("/", createProxyMiddleware({
    target: 'http://localhost:' + port,     // 前端静态资源地址
}))
proxyApp.listen(3012);                      // 反向代理端口
