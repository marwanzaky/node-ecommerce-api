const http = require('http');
const url = require('url');
const fs = require('fs');

const productsJson = fs.readFileSync(`${__dirname}/products.json`);

var server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    if (pathname === '/products') {
        // res.writeHead(200, { 'Content-type': 'application/json' });
        res.end('hello world, this is an API');
    }

    console.log(req.url);
});


server.listen(8000, '127.0.0.1', () => {
    console.log('Server is listening...');
})