const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "dev";

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Acceso denegado" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
