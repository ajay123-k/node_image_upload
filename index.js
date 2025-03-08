require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;
const cors = require("cors");
const userRoutes = require("./routes/users");
const fileRoutes = require("./routes/file");

app.use("/uploads", express.static("public/uploads"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("------------");
  console.log(req.method, req.url);
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/file", fileRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: "Unknown Request" });
});

app.listen(PORT, () => console.log("Server running successfully"));
