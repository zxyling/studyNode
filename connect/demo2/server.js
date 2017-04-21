let http = require('http');
let querystring = require('querystring');
let util = require('util');

http.createServer((req, res) => {
    res.writeHead(200, {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"X-Requested-With",
        "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
        "X-Powered-By":' 3.2.1',
        "Content-Type":"application/jpg"
    });
    console.log(req.body);
    console.log(req.method);
    console.log(req.url);
    var post = '';

    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){
        post += chunk;
    });

    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){
        res.end(post);
    });
}).listen(3000);
