const db = require("../../configs/database");

/**
 * 🔍 Verifica si el correo existe en la base de datos
 */
exports.checkEmail = async (email) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM user WHERE email = ?`, [email], (err, user) => {
      if (err) return reject(err);
      resolve(!!user);
    });
  });
}

/**
 * 🔐 Genera una nueva contraseña aleatoria de 8 caracteres
 */
exports.generatePassword = () => {
  return Math.random().toString(36).slice(-8);
};