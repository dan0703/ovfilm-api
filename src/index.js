require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuración del servidor
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Editable data
const port = 1623;
const dbserver = '192.168.1.154:27017';
const dbname = 'events';

// Conectar a MongoDB
mongoose.connect(`mongodb://${dbserver}/${dbname}` )
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

  
// Ruta básica
app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

// Puerto
const PORT = process.env.PORT || port;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
