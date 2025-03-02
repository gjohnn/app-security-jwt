# Express MySQL CRUD API

Este proyecto es una API RESTful construida con **Node.js**, **Express** y **MySQL**, siguiendo una arquitectura modular con modelos, controladores y rutas.

## 🚀 Instalación y configuración

### 1. Clonar el repositorio
```sh
git clone https://github.com/gjohnn/myNodeJsExpressSecurity.git express-security
cd express-security
```

### 1.2. Devcontainers (Opcional)
Si tenes Docker y VS Code instalados, podes hacer levantar el proyecto con devcontainers asi usas la misma version de postgresql y node

### 2. Instalar dependencias
```sh
npm install
```

### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz con la siguiente estructura:
```ini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos
```

### 4. Ejecutar el servidor
```sh
npm start  # Modo normal
npm run dev  # Modo desarrollo con nodemon (recargar cuando se hace un cambio)
```

## 🛠 Tecnologías utilizadas
- Node.js
- Express.js
- MySQL
- dotenv
- JWT (JSON Web Token) para autenticación
- bcrypt para el manejo de contraseñas