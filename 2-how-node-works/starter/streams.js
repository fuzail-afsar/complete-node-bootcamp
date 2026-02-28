const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  //   fs.readFile("./test-file.txt", "utf-8", (err, data) => {
  //     if (err) console.error(err);
  //     res.end(data);
  //   });
  // Solution2: Streams
  //   const readableStream = fs.createReadStream("./test-file.txt", "utf-8");
  //   readableStream.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readableStream.on("end", () => {
  //     res.end();
  //   });
  //   readableStream.on("error", () => {
  //     res.statusCode = 500;
  //     res.end("File not found!");
  //   });

  // Solution 3
  const readableStream = fs.createReadStream("./test-file.txt", "utf-8");
  readableStream.pipe(res);
  // readableSource.pipe(WriteableDest);
});
server.listen(8000, "127.0.0.1", () => {
  console.log("App is running...");
});
