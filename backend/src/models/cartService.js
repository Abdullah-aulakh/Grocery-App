import pool from "../config/db.js";


export const addToCart = async (userId, productId) => {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO cart (user_id, product_id, quantity)
       VALUES ($1, $2, 1)
       ON CONFLICT (user_id, product_id)
       DO UPDATE SET quantity = cart.quantity + 1`,
      [userId, productId]
    );
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}


export const getCart= async (userId) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT p.id, p.name, c.quantity
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [userId]
    );
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

export const updateCartQuantity = async (userId, productId, quantity) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE cart 
       SET quantity = $3 
       WHERE user_id = $1 AND product_id = $2 
       RETURNING *`,
      [userId, productId, quantity]
    );
    return result.rows[0]; // returns updated row
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};


export const deleteCartItem = async (userId, productId) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM cart 
       WHERE user_id = $1 AND product_id = $2 
       RETURNING *`,
      [userId, productId]
    );
    return result.rows[0]; // returns deleted row
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};
