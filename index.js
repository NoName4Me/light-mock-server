const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const bodyParser = require('koa-bodyparser');
// 导入controller middleware:
const controller = require('./controller');

let routerMapper = {};

app.use(bodyParser());

// 使用middleware:
app.use(controller());

app.listen(3001);
