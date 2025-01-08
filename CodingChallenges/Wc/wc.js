const fs = require("fs");
const path = require("path");
function read() {
  let count = 0;
  const readableStream = fs.createReadStream(path.join(__dirname, "text.txt"));

  readableStream.on("error", (error) => {
    console.log(error);
  });

  readableStream.on("data", async (chunk) => {
    readableStream.pause();
    count += chunk.byteLength;
    await sleep();
    readableStream.resume();
    console.log(count);
  });
}

read();

function getBytes(string) {
  return Buffer.byteLength(string, "utf8");
}

function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}
