// server/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

console.log("Starting server...");

app.use(cors());
app.use(bodyParser.json());

console.log("Middleware initialized...");

app.use("/api", itemRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
