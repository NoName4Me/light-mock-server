const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const bodyParser = require('koa-bodyparser');

// load controller tool
const controller = require('./controller');

let routerMapper = {};

app.use(bodyParser());

// load mock data, and register
app.use(controller('controllers'));

app.listen(3001);
