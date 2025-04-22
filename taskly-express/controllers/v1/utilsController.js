const pool = require("../../configs/database");

/**
 * 🔍 Verifica si el correo existe en la base de datos (Supabase)
 */
exports.checkEmail = async (email) => {
  try {
    const result = await pool.query(`SELECT 1 FROM "user" WHERE email = $1 LIMIT 1`, [email]);
    return result.rowCount > 0;
  } catch (err) {
    throw err;
  }
};

/**
 * 🔐 Genera una nueva contraseña aleatoria de 8 caracteres
 */
exports.generatePassword = () => {
  return Math.random().toString(36).slice(-8);
};