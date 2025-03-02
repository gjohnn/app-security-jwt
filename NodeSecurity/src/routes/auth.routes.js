const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { generateToken } = require('../auth/jwt');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const nuevoUsuario = await User.create(req.body);
    res.status(201).send(nuevoUsuario);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = generateToken(user);
      res.status(200).send({ token });
    } else {
      res.status(400).send({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
