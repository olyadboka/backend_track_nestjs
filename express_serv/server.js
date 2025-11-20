const express = require("express");
const UserRouters = require("./routes/usersRoutes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", UserRouters);

// a middleware is always between the request and the response
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
  next();
});

app.listen(3030, () => {
  console.log("Server is running on port 3030");
});
