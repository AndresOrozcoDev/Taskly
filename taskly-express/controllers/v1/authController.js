const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../configs/database");
const { checkEmail, generatePassword } = require("./utilsController");

const SECRET_KEY = process.env.JWT_SECRET || "dev";

/**
 * 📌 Registro de usuario
 */
exports.register = async (req, res) => {
  const { email, password, rol = "user" } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "El email y la contraseña son obligatorios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const normalizedEmail = email.toLowerCase();

    db.run(
      `INSERT INTO user (email, password, rol) VALUES (?, ?, ?)`,
      [normalizedEmail, hashedPassword, rol || "user"],
      function (err) {
        if (err) {
          return res.status(400).json({ message: "Error al registrar usuario", error: err.message });
        }
        res.status(201).json({ message: "Usuario registrado correctamente" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error interno", error: error.message });
  }
};

/**
 * 📌 Inicio de sesión
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const normalizedEmail = email.toLowerCase();

  try {
    db.get(`SELECT * FROM user WHERE email = ?`, [normalizedEmail], async (err, user) => {

      if (err || !user) {
        return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, rol: user.rol },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

/**
 * 📌 Obtener usuario autenticado
 */
exports.getUser = (req, res) => {
  res.json({ user: req.user });
};

/**
 * 📌 Recuperar contraseña
 */
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "El correo electrónico es obligatorio" });
  }

  const normalizedEmail = email.toLowerCase();

  try {
    const exists = await checkEmail(normalizedEmail);
    if (!exists) {
      return res.status(404).json({ message: "El correo no está registrado" });
    }

    const newPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await new Promise((resolve, reject) => {
      db.run(
        `UPDATE user SET password = ? WHERE email = ?`,
        [hashedPassword, normalizedEmail],
        function (err) {
          if (err) return reject(err);
          resolve();
        }
      );
    });

    return res.status(200).json({
      message: "Contraseña actualizada correctamente",
      email: normalizedEmail,
      newPassword
    });

  } catch (error) {
    res.status(500).json({ message: "Error al recuperar la contraseña", error: error.message });
  }
};