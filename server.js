const express = require("express");
const cors = require("cors");
const dbConn = require("./config/db");
require("dotenv").config();
const bloodRoutes = require("./routes/blood.routes");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://blooddonar.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use("/api/v1/blood", bloodRoutes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
