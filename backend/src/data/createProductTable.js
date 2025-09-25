import pool from '../config/db.js';

export const createProductTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(name)
      );
    `);
    console.log("Products table created");
  } catch (error) {
    console.error("Error creating products table:", error.message);
  } finally {
    client.release();
  }
};
