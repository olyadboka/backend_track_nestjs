const express = require("express");

const app = express();
app.use(express.json());
let users = [
  { id: 1, name: "Olyad" },
  { id: 2, name: "Boka" },
  { id: 3, name: "Kumsa" },
];

//CREATE a new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

//READ all users
app.get("/users", (req, res) => {
  res.json(users);
});

//UPDATE  a user by ID

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updateUser = req.body;
  users = users.map((user) =>
    user.id == userId ? { ...user, ...updateUser } : user
  );
  res.json(updateUser);
});

//DELETE a user by ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id != id);
  res.status(204).send();
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
