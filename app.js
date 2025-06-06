const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'Projeto_Final/views'));

const pagesRoutes = require('./routes/pagesRoutes')
app.use('/', pagesRoutes);


const leitoresRoutes = require('./routes/leitoresRoutes');
app.use('/leitor', leitoresRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});