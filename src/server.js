const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const reports = require("./routes/api/reports");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/reports", reports);

app.get("/", (req, res) => res.send("Hello hello-------????"));

const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Server running on port ${port}`));
