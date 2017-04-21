'use strict';

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var router = (0, _koaRouter2.default)();

/*app.use(async (ctx, next) => {
    console.log('going down');
    await next();

    console.log('going more up');
});

app.use(async (ctx, next) => {
    console.log('going more down');
    ctx.body = 'test';
//    await next();

    console.log('going up');
});

app.use(async (ctx, next) => {
    console.log(">>>>>");
    await next();
    ctx.body = 'Hello World!';
});*/

router.get("/debug", function (ctx, next) {
    ctx.body = 'this is debug page!';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(5555);
