const express = require("express");

const app = express();
app.use(express.json());
let users = [
  { id: 1, name: "Olyad" },
  { id: 2, name: "Boka" },
  { id: 3, name: "Kumsa" },
];

app.run(3000, () => {
  console.log("Server is running on port 3000");
});
