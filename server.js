const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

app.use(express.json());

const ProductRoutes = require("./routes/productsRoutes")
app.use("/products", ProductRoutes)
// URL encode the entire MongoDB password
const password = encodeURIComponent("*********");

mongoose
  .connect(
    `mongodb+srv://satishkumar:${password}@cluster0.zd1o8lg.mongodb.net/Employee_Data?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is Running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Does not Connected ", err);
  });
