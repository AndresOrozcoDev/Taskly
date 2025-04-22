const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../../configs/database");
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

    const query = `
      INSERT INTO "users" (email, password, rol)
      VALUES ($1, $2, $3)
      RETURNING id, email, rol
    `;

    const values = [normalizedEmail, hashedPassword, rol];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: result.rows[0]
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
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
    const result = await pool.query(`SELECT * FROM "users" WHERE email = $1`, [normalizedEmail]);
    const user = result.rows[0];

    if (!user) {
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
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
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

    await pool.query(
      `UPDATE "users" SET password = $1 WHERE email = $2`,
      [hashedPassword, normalizedEmail]
    );

    return res.status(200).json({
      message: "Contraseña actualizada correctamente",
      email: normalizedEmail,
      newPassword
    });

  } catch (error) {
    console.error("Error al recuperar contraseña:", error);
    res.status(500).json({ message: "Error al recuperar la contraseña", error: error.message });
  }
};