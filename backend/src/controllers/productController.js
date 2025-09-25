import { addProduct, getAllProducts } from "../models/productService.js";

export const createProduct= async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Product name is required" });
  }

  try {
    const product = await addProduct(name);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
}

export const listProducts= async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
