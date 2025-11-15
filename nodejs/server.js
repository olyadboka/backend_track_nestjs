const http = require("node:http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application / json" });
  res.end(
    JSON.stringify({
      message: "Welcome to out first nodej API ",
      email: "olyadboka@gmail.com",
    })
  );
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
