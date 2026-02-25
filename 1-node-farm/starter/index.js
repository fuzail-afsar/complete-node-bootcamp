const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

/**
 * FILE
 */

// Blocking, Synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOutput = `This is what we know about avacado. ${textIn} \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOutput);
// console.log('Content has been written in the file!');

// Non-blocking, Asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', () => {
//                 console.log('File has been written');
//             })
//         });
//     });
// });

/**
 * SERVER
 */
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempOver = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProd = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const productsSlug = dataObj.map(el => slugify(el.productName, {
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true,      // convert to lower case, defaults to `false`
    trim: true        // trim leading and trailing replacement chars, defaults to `true`
}));
console.log(productsSlug);

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' })

        const tempHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join();
        const output = tempOver.replace(/{%PRODUCT_CARDS%}/, tempHtml);

        res.end(output);
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' })

        const product = dataObj[query.id];
        const output = replaceTemplate(tempProd, product)

        res.end(output);
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(data)
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end('<h1>Page not found!</h1>')
    }

});
server.listen('8000', '127.0.0.1', () => {
    console.log('Server started!')
});