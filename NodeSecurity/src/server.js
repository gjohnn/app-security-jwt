const express = require('express');
const sequelize = require('./config/database.js');
const { User, Post } = require('./models');
const { authenticateToken } = require('./auth/jwt.js');
const authRoutes = require('./routes/auth.routes.js');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Verificar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// Sincronizar los modelos con la base de datos sin forzar la recreación de las tablas
sequelize.sync({ alter: true }).then(() => {
  console.log('Modelos sincronizados con la base de datos');
});

// Usar las rutas de autenticación
app.use('/auth', authRoutes);

// Ruta protegida que requiere autenticación
app.get('/protected', authenticateToken, (req, res) => {
  res.send(`Acceso concedido. Bienvenido, ${req.user.name}!`);
});

// Ruta para obtener todos los usuarios con sus posts
app.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email'], // Campos del modelo User que deseas incluir
      include: {
        model: Post,
        as: 'posts',
        attributes: ['created_at', 'content'], // Campos del modelo Post que deseas incluir
      },
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
