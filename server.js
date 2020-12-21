// require请求模块, 请求一个http模块,
var http = require('http');
var fs = require('fs');
var url = require('url');

const {
    SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION
} = require('constants');
var port = process.argv[2];

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？');
    process.exit(1);
}

// 建立一个服务器
var server = http.createServer(function (request, response) {

    var parsedUrl = url.parse(request.url, true);
    var pathWithQuery = request.url;
    var queryString = '';
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname;
    var query = parsedUrl.query;
    var method = request.method;

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)


    if (path === '/index.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')

        let accept = request.headers['accept'];
        console.log(accept);
        const html = fs.readFileSync('./public/index.html');
        response.write(html);
        response.end()
    } else if (path === '/main.js') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('./public/main.js'));
        response.end();
    } else if (path === '/style.css') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/css;charset=utf-8');
        response.write(
            `   body{
                color : red;
            }`
        );
        response.end();
    } else if (path === '/2.js') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8');
        // 写入的文件的路径
        response.write(fs.readFileSync('./public/2.js'));
        response.end();
    } else if (path === '/3.html') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.write(fs.readFileSync('./public/3.html'));
        response.end();
    } else if (path === '/4.xml') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/xml;chaset=utf-8');
        response.write(fs.readFileSync('./public/4.xml'));
        response.end();
    } else if (path === '/5.json') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/json;charset=utf-8');
        response.write(fs.readFileSync('./public/5.json'));
        response.end();
    } else if (path === '/pages1.json') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/json;charset=utf-8');
        response.write(fs.readFileSync('./db/pages1.json'));
        response.end();

    } else if (path === '/pages2.json') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/json;charset=utf-8');
        response.write(fs.readFileSync('./db/pages2.json'));
        response.end();
    } else if (path == '/pages3.json') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/json;charset=utf-8');
        response.write(fs.readFileSync('./db/pages2.json'));
        response.end();
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`「你访问的页面不存在」，并且状态码为 404`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)