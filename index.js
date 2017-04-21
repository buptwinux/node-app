import 'babel-polyfill';
import Koa from 'koa';
import nunjucks from 'nunjuncks';
import views from 'koa-views';
import router from './routes/index';

var app = new Koa();

nunjucks.configure(__dirname + '/views', { autoescape: true});

app.use(views(__dirname + '/views', {
    map : {
        njk : 'nunjucks' 
    }
}));

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


app.use(router.routes())
   .use(router.allowedMethods());

app.listen(5555);

export default app;
