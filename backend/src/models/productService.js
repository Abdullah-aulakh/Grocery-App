import pool from "../config/db.js";


export const addProduct= async (name) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO products (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING *",
      [name]
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    // If product exists already → fetch it
    const existing = await client.query("SELECT * FROM products WHERE name=$1", [name]);
    return existing.rows[0];
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}


export const getAllProducts = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM products ORDER BY id ASC");
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}
