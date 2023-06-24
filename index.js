const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = 2023;

dotenv.config({ path: "./config.env" });

const products = require("./utils/products");
const userRoutes = require("./routes/userRoute");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome...")
})

app.get("/products", (req, res) => {
  res.status(200).send(products);
});

const DB = process.env.DATABASE;

app.use("/api/v1", userRoutes);

app.listen(port, () => {
  console.log(`Server is Listening on Port ${port}..`);
});

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DATABASE CONNECTED SUCCESSFULLY"))
  .catch((err) => console.log(err));
