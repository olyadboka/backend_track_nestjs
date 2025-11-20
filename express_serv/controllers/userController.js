//Dummy data
let users = [
  { id: 1, name: "Olyad" },
  { id: 2, name: "Boka" },
  { id: 3, name: "Kumsa" },
];

//Create user

exports.createUser = (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
};

//Reading all the users
exports.getUsers = (req, res) => {
  res.json(users);
};

//UPDATE  a user by ID
// it is pushing on the RAM not on the database

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const userId = id;
  const updateUser = req.body;
  users = users.map((user) =>
    user.id == userId ? { ...user, ...updateUser } : user
  );
  res.json(users);
};

exports.delete = (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id != id);
  res.status(204).send();
};
