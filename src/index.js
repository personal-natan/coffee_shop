require("dotenv").config();

const express = require("express");

// ROUTES module
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoutes");

// MIDDLEWARE module
const middlewareLog = require("./middleware/logs");
const { passport } = require("./middleware/jwt");

const app = express();
const db = require("./config/database");

// CONFIG
db.sync({ force: false })
  .then((result) => {
    console.log("#### database connected #####");
  })
  .catch((err) => {
    console.log(err);
  });

// MIDDLEWARE: Path
app.use(middlewareLog.logsRequest);

// MIDDLEWARE: allow body as json
app.use(express.json());

//ROUTES:
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
