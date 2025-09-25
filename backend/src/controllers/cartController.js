import { addToCart, getCart,updateCartQuantity, deleteCartItem } from "../models/cartService.js";
import { addProduct } from "../models/productService.js";


export const addProductToCart= async (req, res) => {
  const { userId, productName } = req.body;

  if (!userId || !productName) {
    return res.status(400).json({ error: "userId and productName are required" });
  }

  try {
    // Ensure product exists
    const product = await addProduct(productName);

    // Add to cart
    await addToCart(userId, product.id);

    res.json({ message: "Product added to cart", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
}

export const getUserCart= async (req, res) => {
  const { userId } = req.params;

  try {
    const items = await getCart(userId);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}

// Update quantity
export const updateQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if(!userId || !productId || !quantity) {
    return res.status(400).json({ error: "userId, productId and quantity are required" });
  }
  if(quantity<0) {
    return res.status(400).json({ error: "Quantity must be a positive number" });
  }
  try {
    const updated = await updateCartQuantity(userId, productId, quantity);
    if (!updated) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete item
export const removeItem = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const deleted = await deleteCartItem(userId, productId);
    if (!deleted) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Item removed", item: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
