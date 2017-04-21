const Koa = require('koa');
const fs  = require('fs');
const app = new Koa()

function render(page) {
    return new Promise((resolve, reject) => {
        let viewUlr = `./view/${page}`;
        fs.readFile(viewUlr, 'binary', (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        })

    })
}


async function route(url) {
    let view = '404.html';
    let viewObj = {};
    viewObj['/'] = 'index.html';
    viewObj['/index'] = 'index.html';
    viewObj['/todo'] = 'todo.html';
    viewObj['/404'] = '404.html';

    view = viewObj[url];
    let html = await render(view);
    return html;
}

app.use(async (ctx) => {
    let url = ctx.request.url;
    let html = await route(url)
    ctx.body = html;
})

app.listen(3000)
console.log('server is starting port 3000')
