//using simple express api

const http = require("http");

const server = http.createServer((req, res) => {
  console.log("The method is:" + req.method);
  console.log("The url is:" + req.url);
  console.log("The headers are:" + req.headers);

  if (req.url == "/api/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify([
        { id: 1, name: "olyad" },
        { id: 2, name: "Bati" },
        { id: 3, name: "Alazer" },
      ])
    );
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Endpoint not found" }));
  }
  // res.writeHead(200, { "Content-Type": "application / json" });
  // res.end(
  //   JSON.stringify({
  //     message: "Welcome to out first nodej API ",
  //     email: "olyadboka@gmail.com",
  //   })
  // );
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
