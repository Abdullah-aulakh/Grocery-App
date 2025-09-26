import pool from '../config/db.js';

export const createBasketItemsTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS basket_items (
        id SERIAL PRIMARY KEY,
        itemName VARCHAR(150) NOT NULL,
        quantity INTEGER NOT NULL,
        isPurchased BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        unique(itemName)
      );
    `);
    console.log("Basket items table created");
  } catch (error) {
    console.error("Error creating basket items table:", error.message);
  } finally {
    client.release();
  }
};  