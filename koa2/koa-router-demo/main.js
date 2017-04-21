import Koa from 'koa';
import fs  from 'fs';
import Router from 'koa-router';

const app = new Koa();

let home = new Router()

// 子路由
home.get('/', async(ctx) => {
    let html = `<a href='page/hello'>hello</a>
                <a href='page/404'>404</a>`;
    ctx.body = html
})


let router = new Router();
router.use('/', home.routes(), home.allowedMethods())

// 加载中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000);
