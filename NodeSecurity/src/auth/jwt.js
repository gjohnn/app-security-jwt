const jwt = require('jsonwebtoken');

const SECRET_KEY = 'tu_secreto_secreto'; // Puedes mover esto a variables de entorno para mayor seguridad

// Función para generar un token JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: 'user' // Puedes agregar más campos aquí
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

module.exports = {
  generateToken,
  authenticateToken,
};
