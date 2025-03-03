const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.error("Error: MONGODB_URL is not defined in environment variables.");
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const ProductRoutes = require("./routes/productsRoutes");
app.use("/products", ProductRoutes);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Database Connected Successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server is Running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err);
    process.exit(1); // Exit the process if the database connection fails
  });
