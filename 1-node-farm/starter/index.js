const fs = require('fs');

/**
 * FILE
 */

// Blocking, Synchronous way
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOutput = `This is what we know about avacado. ${textIn} \nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOutput);
console.log('Content has been written in the file!');

// Non-blocking, Asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', () => {
                console.log('File has been written');
            })
        });
    });
});