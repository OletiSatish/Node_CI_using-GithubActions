const express = require("express")
const router = express.Router()

const Product = require("../models/products");

router.get("/", async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      console.log(err);
      res.status(500).json({ error });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const products = await Product.findById(id);
      res.status(200).json(products);
    } catch (error) {
      console.log(err);
      res.status(500).json({ error });
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const products = await Product.findByIdAndUpdate(id, req.body);
      if (!products) {
        res.status(404).json({
          message: "Product Not Found!!",
        });
      }
      const updateProduct = await Product.findById(id);
      res
        .status(200)
        .json({ updateProduct, message: "Product Updated Sucessfully" });
    } catch (error) {
      console.log(err);
      res.status(500).json({ error });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        res.status(404).json({
          message: "Product Not Found!!",
        });
      }
      res.status(200).json({ product, message: "Product Deleted Sucessfully" });
    } catch (error) {
      console.log(err);
      res.status(500).json({ error });
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  module.exports = router;