let http = require('http');
let fs = require('fs');

http.createServer((req, res) => {
    if('GET' == req.method && '/images' == req.url.substr(0, 7) && '.jpg' == req.url.substr(-4)) {
        fs.stat(__dirname + req.url, (err, stat) => {
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end('Not Found');
                return ;
            }
            server(__dirname + req.url, 'application/jpg');
        })

    } else if ('GET' == req.method && '/' == req.url) {
        server(__dirname + '/index.html', 'text/html');
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
    function server(path, type) {
        res.writeHead(200, {'Content-Type': type});
        fs.createReadStream(path).pipe(res);
    }
}).listen(3000);
