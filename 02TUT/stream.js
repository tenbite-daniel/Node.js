const fs = require("fs");
const { encode } = require("punycode");

const rs = fs.createReadStream("./files/lorem.txt", { encodeing: "utf8" });

const ws = fs.createWriteStream("./files/new-lorem.txt");

// rs.on("data", (dataChunk) => {
//     ws.write(dataChunk);
// });

rs.pipe(ws);
